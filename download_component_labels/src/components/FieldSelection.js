import React from 'react';
import '../css/field_selection.css';
import '../css/checkbox.css';

const FieldSelection = ({ fields, handleFieldToggle }) => {
  return (
    <div className=" col_item mid checklist_container">
      <div className="col_item mid checklist">
        {Object.keys(fields).map(field => (
          <p key={field}>
            <label className="lns-checkbox" key={field}>
              <input
                type="checkbox"
                checked={fields[field]}
                onChange={() => handleFieldToggle(field)}
              />
              <span>{field}</span>
            </label>
          </p>
        ))}
      </div>
    </div>
  );
};

export default FieldSelection;
