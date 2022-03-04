import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import history from '../../../configs/history';

const BasicBreadcrumbs = (props) => {
  const { location } = history;
  console.log("history", history)
  return (
    <div role='presentation'>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          href="/dashboard"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
    </div>
  )
}

export default BasicBreadcrumbs