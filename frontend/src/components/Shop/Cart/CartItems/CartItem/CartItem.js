import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import classes from './CartItem.module.css';
import * as utils from 'utils/utils';
import * as action from 'store/actions/index';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#00acc1',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const cartItem = (props) => {
  const dispatch = useDispatch()
  const row = props.cart
  const [quantity, setQuantity ] = useState(row.quantity)

  const onChangeQuantity = (event) => {
    event.preventDefault()
    if (event.target.value >= 0) {
      setQuantity(event.target.value)
      dispatch(action.addProductToCart(row.product.id, event.target.value))
    }
  }
  const removeProductCart = (productId) => {
    dispatch(action.removeProductCart(productId))
  }
  return (
    <TableRow key={row.product.name}>
      <StyledTableCell>
        <img
          src={row.product.image}
          alt=''
          className={classes.imageTable} 
          />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.product.name}
      </StyledTableCell>
      <StyledTableCell align="right">{utils.formatCurrencyVND(row.product.price)}</StyledTableCell>
      <StyledTableCell align="right"><TextField className={classes.inputNumber} required id="standard-basic" type="number" value={quantity} onChange={(event) => onChangeQuantity(event)} variant="outlined" id="outlined-number"/></StyledTableCell>
      <StyledTableCell align="right">{utils.subtotalItem(row.product.price, quantity)}</StyledTableCell>
      <StyledTableCell align="right">          
        <IconButton edge="end" aria-label="delete" onClick={() => removeProductCart(row.product.id)}>
          <DeleteIcon />
        </IconButton></StyledTableCell>
    </TableRow>
  );
}

export default cartItem;