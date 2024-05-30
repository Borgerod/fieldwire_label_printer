import React from 'react';
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { fetchDevicesAndSaveCSV } from '../utils/api';

const DownloadButton = ({ selectedProjectId, sortField, fields, devices}) => {
    return (
        <container className="button">
            <Button
                style={{
                    backgroundColor: "#35a869"
                }}
                disableElevation={true}
                onClick={() => fetchDevicesAndSaveCSV(selectedProjectId, sortField, fields, devices)}
                variant="contained"
                startIcon={<DownloadIcon />}
            >
                Download CSV
            </Button>
        </container>
    );
};

export default DownloadButton;
