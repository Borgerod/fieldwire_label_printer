import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import Tooltip from '@mui/material/Tooltip';

const CloseIconComponent = () => {
  return (
    <div className='close_icon'>
      <Tooltip title="Not in use; will make it once i know wether this widget is supposed to be a window or accordian">
        <CloseIcon />
      </Tooltip>
    </div>
  );
};

export default CloseIconComponent;
