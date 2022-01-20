import React from 'react';
import Link from '@mui/material/Link';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';

import Title from '../../UI/Title/Title';
import Aux from '../../../hocs/HightAux/HightAux';

// Generate Order Data
const createData = (id, name) => {
  return { id, name};
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

const FooterContent = (onChangePaging, allowSeeMore, totalCount, classes) => {
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
        <Pagination count={ totalCount ? Math.ceil(totalCount / 5) : 1 } size="small" onChange={onChangePaging} />
      </div>
    )
  }
}

const Categories = (props) => {
  const { categories, allowSeeMore, title, totalCount, onChangePaging } = props;
  const rows = categories.map(category => {
    return createData(category.id, category.name)
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} >
              <TableCell size="small" href={`/category/${row.id}`} component="a">
                  <img src={row.image} className={classes.image} alt={row.name}/>
              </TableCell>
              <TableCell href={`/category/${row.id}`} component="a">
                  {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {FooterContent(onChangePaging, allowSeeMore, totalCount, classes)}
    </Aux>
  );
};

export default Categories;