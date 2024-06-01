import React from 'react';
import DownloadIcon from "@mui/icons-material/Download";

import { fetchDevicesAndSaveCSV } from '../utils/api';

import '../css/App.css';

const DownloadButton = ({ fields, devices }) => {
    return (
        <div className="container button">
            <button
                className="download"
                onClick={() => fetchDevicesAndSaveCSV(fields, devices)}>
                <DownloadIcon />
                DOWNLOAD CSV
            </button>
        </div>
    );
};

export default DownloadButton;
