import React from 'react';


const SortSelection = ({ fields, handleSortChange, sortField }) => {

  if (!sortField) {
    sortField=`undefined`
  }

  return (
    <div className="row">
      <div className="row item small">
        <h2>Sort by</h2>
      </div>
      <div className="row item big">
        <select onChange={e => handleSortChange(e.target.value)} value={sortField}>
          <option value={`undefined`}>No Sorting</option>
          {Object.keys(fields).map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortSelection;
