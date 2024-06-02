import React from 'react';
import { convertToCSV } from '../utils/csvUtils';

const generateCSVPreview = (devices, fields) => {
  let devicesData = [...devices];
  return convertToCSV(devicesData, fields).split('\n').slice(0, 3).join('\n') + "\n.  .  .";
};

const Preview = ({ devices, fields }) => {
  return (
    <div className="col_item right preview">
        <pre>{generateCSVPreview(devices,fields)}</pre>
    </div>
  );
};

export default Preview;
