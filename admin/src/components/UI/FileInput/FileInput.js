import React from 'react';
import Button from '@mui/material/Button';

const FileInput = (props) => {
  return (
    <label htmlFor="upload-photo">
      <input
        style={{ display: 'none' }}
        id="upload-photo"
        name="upload-photo"
        type="file"
      />

      <Button color="secondary" variant="contained" component="span">
        Upload button
      </Button>
    </label>
  )
}

export default FileInput;