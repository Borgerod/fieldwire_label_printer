import React from 'react';

const FieldSelection = ({ fields, handleFieldToggle }) => {
  return (
    <div className="row">
      <div className="row item small">
        <h2>Select Fields to Include</h2>
      </div>
      <div className="row item big">
        <div className="container checkbox-list">
          {Object.keys(fields).map(field => (
            <div className="row checkbox" key={field}>
              <input
              style={{
                // caretColor:"#ffff",
                // 'caret-color' : '#ffff',
                
              }}
                type="checkbox"
                checked={fields[field]}
                onChange={() => handleFieldToggle(field)}
              />
              <label>{field}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldSelection;
