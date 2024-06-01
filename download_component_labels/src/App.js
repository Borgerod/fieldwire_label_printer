import React, { useState, useEffect } from 'react';
import { fetchProjects, fetchDevices } from './utils/api';
import CloseIconComponent from './components/CloseIconComponent';
import ProjectSelection from './components/ProjectSelection';
import DownloadButton from './components/DownloadButton';
import FieldSelection from './components/FieldSelection';
import SortSelection from './components/SortSelection';
import Preview from './components/Preview';
import { sortDevices } from './utils/sortUtils';

import './css/font.css';
import './css/App.css';

const App = () => {
  const [projects, setProjects] = useState([]);
  const [devices, setDevices] = useState([]);
  const [fields, setFields] = useState({
    sequence_number: true,
    task_name: true,
    device_type: true,
    team_handle: true
  });

  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [sortField, setSortField] = useState(null);

  useEffect(() => {
    fetchProjects(setProjects);
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchDevices(selectedProjectId, setDevices);
    }
  }, [selectedProjectId, sortField]);

  const handleFieldToggle = (field) => {
    setFields({ ...fields, [field]: !fields[field] });
  };

  const handleSortChange = (sortField) => {
    setSortField(sortField);
    if (sortField) {
      const devicesData = sortDevices(devices, sortField);
      setDevices(devicesData);
    }
  };

   return (
    <div className='App'>
      <div className="leftside">
        <ProjectSelection projects={projects} setSelectedProjectId={setSelectedProjectId} selectedProjectId={selectedProjectId} />
        <FieldSelection fields={fields} handleFieldToggle={handleFieldToggle} />
        <SortSelection fields={fields} handleSortChange={handleSortChange} sortField={sortField} />
      </div>

      <div className="rightside">
        <Preview devices={devices} sortField={sortField} fields={fields} />
        <DownloadButton selectedProjectId={selectedProjectId} sortField={sortField} fields={fields} devices={devices} />
      </div>
      
      <CloseIconComponent />
      </div>
  );
};

export default App;
