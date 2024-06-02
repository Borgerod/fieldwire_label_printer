import React from 'react';

// TODO: make custom dropdown
const ProjectSelection = ({ projects, setSelectedProjectId, selectedProjectId }) => {
  return (
    <div className="col_item mid">
        <select onChange={e => setSelectedProjectId(e.target.value)} value={selectedProjectId}>
          <option value={`undefined`}>No selection</option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
    </div>
  );
};


export default ProjectSelection;

