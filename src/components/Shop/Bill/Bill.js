import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const bill = () => {
  const classes = useStyles();

  return (
    <List dense className={classes.root}>
      <ListItem>
        <ListItemText id="subtotal" primary="Subtotal" />
        <ListItemSecondaryAction>
          <Typography>Text</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemText id="delivery" primary="Delivery" />
        <ListItemSecondaryAction>
          <Typography>Text</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <hr style={{ borderTop: "1px solid rgb(189 189 189)", width: "92%" }} />
      <ListItem>
        <ListItemText id="total" primary="Total" />
        <ListItemSecondaryAction>
          <Typography>Text</Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <Button
          variant="contained"
          color="primary"
          fullWidth
        >
          Checkout
        </Button>
      </ListItem>
    </List>
  );
}

export default bill;