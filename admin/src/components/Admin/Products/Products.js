import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';

import Title from '../../UI/Title/Title';
import Aux from '../../../hocs/HightAux/HightAux';

// Generate Order Data
const createData = (id, name, category, image, price, quantity, is_public) => {
  return { id, name, category, image, price, quantity, is_public};
}

// const rows = [
//   createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
//   createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
//   createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
// ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paging: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: 40,
    height: 40
  }
}));

const seeMore = (allowSeeMore, totalCount, classes) => {
  if(allowSeeMore) {
    return (
      <div className={classes.seeMore}> 
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    )
  } else {
    return (      
      <div className={classes.paging}>
        <Pagination count={ 1 } size="small" />
      </div>
    )
  }
}

const Products = (props) => {
  const { products, allowSeeMore, title, totalCount } = props;
  const rows = products.map( product => {
    return createData(product.id, product.name, product.category.name, product.image, product.price, product.quantity, true)
  })

  const classes = useStyles();
  return (
    <Aux>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell size="small" >
                <img src={row.image} className={classes.image} alt={row.name}/>
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {seeMore(allowSeeMore, totalCount, classes)}
    </Aux>
  );
};

export default Products;