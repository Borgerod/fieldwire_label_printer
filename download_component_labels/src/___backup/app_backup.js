import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './font.css';
import {
  Button,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from '@mui/icons-material/Close';

const apiToken = "ewPuywjJJUC89C08gvmqhmPasT5yGJYECmerHfH6TSBwNHctHmB4tEvtV0hbBxW8";

const App = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [devices, setDevices] = useState([]);
  const [fields, setFields] = useState({
    sequence_number: true,
    task_name: true,
    device_type: true,
    team_handle: true
  });
  const [sortField, setSortField] = useState(null);





  useEffect(() => {
    if (selectedProjectId) {
      fetchDevices();
    }
  }, [selectedProjectId]);

  const fetchDevices = async () => {
    try {
      if (!selectedProjectId) {
        console.error("No project selected.");
        return;
      }
      const response = await axios.get(`http://127.0.0.1:8000/project/${selectedProjectId}/devices?api_token=${apiToken}`);
      let devicesData = response.data;
      if (sortField) {
        devicesData = sortDevices(devicesData, sortField);
      }
      setDevices(devicesData);
    } catch (error) {
      console.error("Error fetching devices:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/projects?api_token=${apiToken}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };



  const fetchDevicesAndSaveCSV = async () => {
    try {
      if (!selectedProjectId) {
        console.error("No project selected.");
        return;
      }
      const response = await axios.get(`http://127.0.0.1:8000/project/${selectedProjectId}/devices?api_token=${apiToken}`);
      let devicesData = response.data;
      if (sortField) {
        devicesData = sortDevices(devicesData, sortField);
      }
      saveCSV(devicesData);
    } catch (error) {
      console.error("Error fetching devices and saving CSV:", error);
    }
  };

  const sortDevices = (data, field) => {
    return data.sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });
  };

  const saveCSV = (devicesData) => {
    try {
      const csvData = convertToCSV(devicesData);
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'component_labels.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error saving CSV:", error);
    }
  };

  const convertToCSV = (data) => {
    const selectedFields = Object.keys(fields).filter(field => fields[field]);
    // const header = selectedFields.join(',');
    // if you want header to be fields instead
    const header = "component_label";
    const rows = data.map(device => {
      return selectedFields.map(field => device[field]).join(' - ');
    });
    return [header, ...rows].join('\n');
  };

  const handleFieldToggle = (field) => {
    setFields({ ...fields, [field]: !fields[field] });
  };

  const handleSortChange = (field) => {
    setSortField(field);
  };

  const generateCSVPreview = () => {
    let devicesData = [...devices];
    if (sortField) {
      devicesData = sortDevices(devicesData, sortField);
    }
    return convertToCSV(devicesData).split('\n').slice(0, 5).join('\n')+"\n.  .  .";
  };

  return (
    // TODO
    <splitscreen>

      {/* LEFTSIDE */}
      <div className="leftside">

        {/* Select Project  (dropbox row)*/}
        <row>
          <row className="item small">
            <h2>Select Project</h2>
          </row>
          <row className="item big">
            <select onChange={e => setSelectedProjectId(e.target.value)} value={selectedProjectId}>
              <option value=""></option>
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </row>
        </row>

        {/* Select Fields (checkbox row) */}
        <row>
          <row className="item small">
            <h2>Select Fields to Include</h2>
          </row>
          <row className="item big">
            {/* TODO */}
            <container className="checkbox-list">
              {Object.keys(fields).map(field => (
                <row className="checkbox" key={field}>
                  <input
                    type="checkbox"
                    checked={fields[field]}
                    onChange={() => handleFieldToggle(field)}
                  />
                  <label>{field}</label>
                </row>
                
              ))}
            </container>
          </row>
        </row>

        {/* Sort By  (dropbox row)*/}
        <row>
          <row className="item small">
            <h2>Sort by</h2>
          </row>
          <row className="item big">
            <select onChange={e => handleSortChange(e.target.value)} value={sortField}>
              <option value="">No sorting</option>
              {Object.keys(fields).map(field => (
                <option key={field} value={field}>
                  {field}
                </option>
              ))}
            </select>
          </row>
        </row>

      </div>


      {/* RIGHTSIDE */}
      <div className="rightside">

        {/* Preview */}
        <container>
          <row class="header">
          <h2 class="dark">Preview</h2>
          {/* <h1>Preview</h1> */}
            
          </row>
          <container className="preview">
            <pre>{generateCSVPreview()}</pre>
          </container>
        </container>

        {/* Download Button */}
        <container className="button">
          <Button
            style={{
              backgroundColor: "#35a869"
            }}
            disableElevation={true}
            onClick={fetchDevicesAndSaveCSV}
            variant="contained"
            startIcon={<DownloadIcon />}
          >
            Download CSV
          </Button>
        </container>

      </div>
      {/* Close Icon [PLACEHOLDER][OPTIONAL] */}
      {/* I don't know if this widget should be a popup window or a drop down drawer */}
      <stack>
        <CloseIcon/>
      </stack>

    </splitscreen>
  );
};

export default App;
