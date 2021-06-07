import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import LayoutContent from '../../components/UI/LayoutContent/LayoutContent';
import ProductForm from '../../components/Admin/Products/CreateProduct';

const useStyles = (theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
});

class CreateProduct extends Component {
  render () {
    const { classes } = this.props;
    return (
      <LayoutContent>
        <ProductForm xs={12} paperClasses={classes.paper}/>
      </LayoutContent>
    )
  }
}

export default withStyles(useStyles)(CreateProduct);