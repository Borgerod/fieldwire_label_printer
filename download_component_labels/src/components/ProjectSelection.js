import React from 'react';

const ProjectSelection = ({ projects, setSelectedProjectId, selectedProjectId }) => {
  return (
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
  );
};

export default ProjectSelection;
