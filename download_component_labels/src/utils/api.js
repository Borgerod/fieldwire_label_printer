import axios from 'axios';
import { sortDevices } from './sortUtils';
import { saveCSV } from './csvUtils'; // Ensure saveCSV is imported correctly

//TODO Should Probably change the location of the API token, sort of depends on what the main app looks like.
// would probably be best to put it in backend

const apiToken = "ewPuywjJJUC89C08gvmqhmPasT5yGJYECmerHfH6TSBwNHctHmB4tEvtV0hbBxW8";

export const fetchProjects = async (setProjects) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/projects?api_token=${apiToken}`);
    setProjects(response.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const fetchDevices = async (projectId, setDevices, sortField) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/devices?api_token=${apiToken}`);
    let devicesData = response.data;
    if (sortField) {
      devicesData = sortDevices(devicesData, sortField);
    }
    setDevices(devicesData);
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
};

export const fetchDevicesAndSaveCSV = async (projectId, sortField, fields, devices) => {
  try {
    if (sortField) {
      devices = sortDevices(devices, sortField);
    }
    saveCSV(devices, fields);
  } catch (error) {
    console.error("Error fetching devices and saving CSV:", error);
  }
};