import React from 'react';
import { convertToCSV } from '../utils/csvUtils';

const generateCSVPreview = (devices, sortField, fields) => {
  let devicesData = [...devices];
  return convertToCSV(devicesData, fields).split('\n').slice(0, 5).join('\n') + "\n.  .  .";
};

const Preview = ({ devices, sortField, fields }) => {
  return (
    <div className="container">
      <div className="row header">
        <h2 className="dark">Preview</h2>
      </div>
      <div className="container preview">
        <pre>{generateCSVPreview(devices, sortField, fields)}</pre>
      </div>
    </div>
  );
};

export default Preview;
