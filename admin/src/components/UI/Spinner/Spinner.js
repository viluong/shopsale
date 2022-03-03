import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const spinner = () => {

  return (
    <div style={{
      width: "100%",
      height: "100%",
      zIndex: '100',
      position: "fixed",
      backgroundColor: "rgba(255,255,255,0.7)",
      
      }}
    >
      <CircularProgress disableShrink style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: '101'
      }}/>;
    </div>
  )
}

export default spinner;