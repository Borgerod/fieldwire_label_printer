import React from 'react';

const FieldSelection = ({ fields, handleFieldToggle }) => {
  return (
    <row>
      <row className="item small">
        <h2>Select Fields to Include</h2>
      </row>
      <row className="item big">
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
  );
};

export default FieldSelection;
