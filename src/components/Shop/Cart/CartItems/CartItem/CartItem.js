import React from 'react';
import { CheckBox } from '@material-ui/icons';
import TableRow from '@material-ui/core/TableRow';
import { StyledTableCell } from '../CartItems';
import classes from './CartItem.module.css';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const cartItem = (props) => {
  const row = props.row
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <TableRow key={row.name}>
      <StyledTableCell>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
      </StyledTableCell>
      <StyledTableCell>
        <img
          src='https://product.hstatic.net/1000383440/product/62105201_1821444534666118_5397009136254713856_n_dacf1cbb56554dcca7e569b7edae4f29_master.jpg'
          alt=''
          className={classes.imageTable} 
          />
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {row.name}
      </StyledTableCell>
      <StyledTableCell align="right">{row.calories}</StyledTableCell>
      <StyledTableCell align="right">{row.fat}</StyledTableCell>
      <StyledTableCell align="right">{row.carbs}</StyledTableCell>
      <StyledTableCell align="right">{row.protein}</StyledTableCell>
    </TableRow>
  );
}

export default cartItem;