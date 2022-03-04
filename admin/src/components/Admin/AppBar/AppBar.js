import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Breadcrumbs from '../../UI/Breadcrumbs/Breadcrumbs';
import Button from '../../UI/Button/Button';

const ContentHeader = (props) => {
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Breadcrumbs />
        <Button />
      </Toolbar>
    </AppBar>
  </Box>
}

export default ContentHeader