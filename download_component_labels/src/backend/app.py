# backend/app.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import aiohttp
import asyncio
import csv
from fastapi.responses import FileResponse

app = FastAPI()

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Options:
    def __init__(self, api_token):
        self.api_token = api_token
        self.access_token = None
        self.headers = None
        self.payload = {"api_token": api_token}

    async def setAccessToken(self, session):
        url = "https://client-api.super.fieldwire.com/api_keys/jwt"
        async with session.post(url, json=self.payload, headers={
            "accept": "application/json",
            "content-type": "application/json"
        }) as response:
            data = await response.json()
            self.access_token = data['access_token']
            self.headers = {
                "accept": "application/json",
                "Fieldwire-Version": "2024-05-26",
                "authorization": f"Bearer {self.access_token}"
            }

class ApiHandler(Options):
    def __init__(self, api_token):
        super().__init__(api_token)
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

class Project:
    def __init__(self, projectProfile):
        self.project_id = projectProfile['id']
        self.project_name = projectProfile['name']
        self.anchor_region = projectProfile['anchor_region']
        self.tasks = []
        self.team_id = None
        self.team = []
        self.devices = []

@app.post("/get_access_token")
async def get_access_token(api_token: str):
    async with aiohttp.ClientSession() as session:
        api = ApiHandler(api_token)
        await api.setAccessToken(session)
        return {"access_token": api.access_token}

@app.get("/projects")
async def get_projects(api_token: str):
    async with aiohttp.ClientSession() as session:
        api = ApiHandler(api_token)
        await api.setAccessToken(session)
        await api.setAllProjects(session)
        return [{"id": project_id, "name": project.project_name} for project_id, project in api.allProjects.items()]

@app.get("/project/{project_id}/devices")
async def get_devices(api_token: str, project_id: str):
    async with aiohttp.ClientSession() as session:
        api = ApiHandler(api_token)
        await api.setAccessToken(session)
        devices = await api.getAllDevicesForProject(session, project_id)
        return devices

@app.post("/save_csv")
async def save_csv(devices: list, fields_to_include: dict):
    filename = "component_labels.csv"
    header = ["component_labels"]

    with open(filename, mode='w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=header)
        writer.writeheader()

        for device in devices:
            component_label = ", ".join(
                [f"{key}: {value}" for key, value in device.items() if fields_to_include.get(key)]
            )
            writer.writerow({"component_label": component_label})

    return FileResponse(filename, media_type='application/octet-stream', filename=filename)
