import React from 'react';


const SortSelection = ({ fields, handleSortChange, sortField }) => {

  if (!sortField) {
    sortField=`undefined`
  }

  return (
    <row>
      <row className="item small">
        <h2>Sort by</h2>
      </row>
      <row className="item big">
        <select onChange={e => handleSortChange(e.target.value)} value={sortField}>
          <option value={`undefined`}>No Sorting</option>
          {Object.keys(fields).map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </row>
    </row>
  );
};

export default SortSelection;
