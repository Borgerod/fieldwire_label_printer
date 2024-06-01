import axios from 'axios';
import { saveCSV } from './csvUtils';

export const fetchProjects = async (setProjects) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/projects`);
    setProjects(response.data);
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const fetchDevices = async (projectId, setDevices) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/devices`);
    let devicesData = response.data;
    setDevices(devicesData);
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
};

export const fetchDevicesAndSaveCSV = async (fields, devices) => {
  try {
    saveCSV(devices, fields);
  } catch (error) {
    console.error("Error fetching devices and saving CSV:", error);
  }
};