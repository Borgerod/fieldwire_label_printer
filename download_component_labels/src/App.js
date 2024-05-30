import React, { useState, useEffect } from 'react';
import './css/App.css';
import './css/font.css';
import ProjectSelection from './components/ProjectSelection';
import FieldSelection from './components/FieldSelection';
import SortSelection from './components/SortSelection';
import Preview from './components/Preview';
import DownloadButton from './components/DownloadButton';
import CloseIconComponent from './components/CloseIconComponent';
import { fetchProjects, fetchDevices } from './utils/api';
//! sortDevices() gets called too many times, especially in api.js.
//TODO  call sortDevices() here and make it do the sorting once every time "sort by" is changed. 

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
    fetchProjects(setProjects);
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      fetchDevices(selectedProjectId, setDevices, sortField);
    }
  }, [selectedProjectId, sortField]);

  const handleFieldToggle = (field) => {
    setFields({ ...fields, [field]: !fields[field] });
  };

  const handleSortChange = (field) => {
    setSortField(field);
  };

  return (
    <div className='splitscreen'>
      <div className="leftside">
        <ProjectSelection projects={projects} setSelectedProjectId={setSelectedProjectId} selectedProjectId={selectedProjectId} />
        <FieldSelection fields={fields} handleFieldToggle={handleFieldToggle} />
        <SortSelection fields={fields} handleSortChange={handleSortChange} sortField={sortField} />
      </div>
      <div className="rightside">
        {/* <Preview generateCSVPreview={generateCSVPreview} /> */}
        <Preview devices={devices} sortField={sortField} fields={fields} />

        <DownloadButton selectedProjectId={selectedProjectId} sortField={sortField} fields={fields} devices={devices} />
      </div>
      <CloseIconComponent />
    </div>
  );
};

export default App;
