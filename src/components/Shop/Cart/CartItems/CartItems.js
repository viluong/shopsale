import React from 'react';
import { useSelector } from 'react-redux';

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { CheckBox } from '@material-ui/icons';
import CartItem from './CartItem/CartItem';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#00acc1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  imageTable: {
    maxWidth: 50,
    maxHeight: 50
  }
});

const cartItems = () => {
  const carts = useSelector(state => state.cart.carts)
  const classes = useStyles()
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="right">Quantity</StyledTableCell>
            <StyledTableCell align="right">Subtotal</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.map((row, index) => (
            <CartItem cart={row} key={index}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default cartItems;