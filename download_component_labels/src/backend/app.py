''' external imports '''
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from datetime import datetime as dt
import aiohttp
import asyncio
import csv

''' local imports '''
from src.backend.api_token import APItoken as API_TOKEN 


app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],  
)

class Options:
    def __init__(self):
        self.api_token = API_TOKEN
        self.access_token = None
        self.headers = None
        self.payload = {"api_token": API_TOKEN}
        self.fieldwire_version = str(dt.now().strftime("%Y-%m-%d")) #date as str

    async def checkAccessToken(self, session):
        ''' will check the connection or if access_token has expired'''
        async with session.get("https://client-api.us.fieldwire.com/api/v3/account/account_data_types", headers={
                "accept": "application/json",
                "Fieldwire-Version": f"{self.fieldwire_version}",
                "authorization": f"Bearer {self.access_token}",
                }) as res:
            if res.status == 200:
                return True
            else:
                return False

    async def getAccessToken(self, session):
        url =  'https://client-api.super.fieldwire.com/api_keys/jwt'
        async with session.post(url, json=self.payload, headers={
                "accept": "application/json",
                "content-type": "application/json"}) as response:
            data = await response.json()
            return data['access_token']
            
    async def setAccessToken(self, session):
        if self.access_token:
            if await self.checkAccessToken(session):
                self.headers = {
                    "accept": "application/json",
                    "Fieldwire-Version": f"{self.fieldwire_version}",
                    "authorization": f"Bearer {self.access_token}",
                }
        else:
            self.access_token = await self.getAccessToken(session)
            await self.setAccessToken(session) #Probably redundant to rerun this         

class ApiHandler(Options):
    def __init__(self,):
        super().__init__()
        self.allProjects = {}

    async def setAllProjects(self, session):
        url = "https://client-api.us.fieldwire.com/api/v3/account/projects"
        async with session.get(url, headers=self.headers) as response:
            projectProfiles = await response.json()
            self.allProjects = {profile['id']: Project(profile) for profile in projectProfiles}

    def getProject(self, project_id):
        return self.allProjects.get(project_id)

    async def getTasksFromProjectId(self, session, project_id):
        url = f'https://client-api.us.fieldwire.com/api/v3/projects/{project_id}/tasks'
        async with session.get(url, headers=self.headers) as response:
            return await response.json()

    async def getTeamForTask(self, session, project_id, team_id, taskItem):
        url = f"https://client-api.us.fieldwire.com/api/v3/projects/{project_id}/teams/{team_id}"
        async with session.get(url, headers=self.headers) as response:
            teamData = await response.json()
            return {
                'sequence_number': taskItem['sequence_number'],
                'task_name': taskItem['name'],
                'device_type': teamData['name'],
                'team_handle': teamData['handle'],
            }

    async def getAllDevicesForProject(self, session, project_id):
        tasksData = await self.getTasksFromProjectId(session, project_id)
        tasks = [self.getTeamForTask(session, project_id, task['team_id'], task) for task in tasksData]
        return await asyncio.gather(*tasks)


@app.get("/projects")
async def get_projects():
    async with aiohttp.ClientSession() as session:
        api = ApiHandler()
        await api.setAccessToken(session)
        await api.setAllProjects(session)
        return [{"id": project_id, "name": project.project_name} for project_id, project in api.allProjects.items()]

@app.get("/project/{project_id}/devices")
async def get_devices(project_id: str):
    async with aiohttp.ClientSession() as session:
        api = ApiHandler()
        await api.setAccessToken(session)
        devices = await api.getAllDevicesForProject(session, project_id)
        return devices

@app.post("/save_csv")
async def save_csv(devices: list, fields_to_include: dict):
    header, filename = ["component_labels"], f"component_labels.csv"
    
    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames = [header])
        writer.writeheader()
        
        for device in devices:
            component_label = ", ".join(
                [f"{key}: {value}" for key, value in device.items() if fields_to_include.get(key)]
            )
            writer.writerow({"component_label": component_label})

    return FileResponse(filename, media_type='application/octet-stream', filename=filename)


class Project:
    def __init__(self, projectProfile):
        self.project_id = projectProfile['id']
        self.project_name = projectProfile['name']
        self.anchor_region = projectProfile['anchor_region']
        self.tasks = []
        self.team_id = None
        self.team = []
        self.devices = []
