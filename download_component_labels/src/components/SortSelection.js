import React from 'react';

// TODO: make custom dropdown

const SortSelection = ({ fields, handleSortChange, sortField }) => {

  if (!sortField) {
    sortField=`undefined`
  }

  return (

      <div className="col_item mid">
        <select onChange={e => handleSortChange(e.target.value)} value={sortField}>
          <option value={`undefined`}>No Sorting</option>
          {Object.keys(fields).map(field => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

  );
};

export default SortSelection;
