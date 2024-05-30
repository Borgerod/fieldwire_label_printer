import React from 'react';

const ProjectSelection = ({ projects, setSelectedProjectId, selectedProjectId }) => {
  return (
    <div className="row">
      <div className="row item small">
        <h2>Select Project</h2>
      </div>
      <div className="row item big">
        <select onChange={e => setSelectedProjectId(e.target.value)} value={selectedProjectId}>
          <option value=""></option>
          {projects.map(project => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProjectSelection;
