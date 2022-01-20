import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Grid from '@mui/material/Grid';

const ColumnGrid = (props) => {
  const elements = props
  return (
    <Grid
      container 
      spacing={1}>
      <Grid item xs={8} 
        container
        direction="row"   
        justifyContent="flex-end"
        alignItems="center">
        { elements.label }
      </Grid>
      <Grid item xs={4} 
        container
        direction="row"
        justifyContent="center"
        alignItems="center">
          <TextField
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start">{ elements.adornment }</InputAdornment>,
              disableUnderline: true,
              readOnly: true
            }}
            value={ elements.value }
          />
      </Grid>
    </Grid>
  )
}

export default ColumnGrid;