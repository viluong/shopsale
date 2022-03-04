import React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const BasicButton = (props) => {
  const { componentIcon, label } = props;
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" startIcon={componentIcon}>{ label }</Button>
    </Stack>
  );
}

export default BasicButton;