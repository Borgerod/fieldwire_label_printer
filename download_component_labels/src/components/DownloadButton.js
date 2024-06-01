import React from 'react';
import DownloadIcon from "@mui/icons-material/Download";
import { fetchDevicesAndSaveCSV } from '../utils/api';
import '../css/App.css';
// import { Button } from "@mui/material"; //!dont remove untill the new doanload button is tested
const DownloadButton = ({ selectedProjectId, sortField, fields, devices }) => {
    return (
        <div className="container button">
            
            
            {/* <Button
                //! Keep this incase the new DOWNLOAD CSV button doesn't work 
                style={{
                    backgroundColor: "#35a869"
                }}
                disableElevation={true}
                onClick={() => fetchDevicesAndSaveCSV(selectedProjectId, sortField, fields, devices)}
                variant="contained"
                startIcon={<DownloadIcon />}
            >
                Download CSV
            </Button> */}


            <button
                className="download"
                onClick={() => fetchDevicesAndSaveCSV(
                    fields, devices
                )}>
                <DownloadIcon />
                DOWNLOAD CSV
            </button>
        </div>
    );
};

export default DownloadButton;
