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
import { formatDateTime } from '../../../utils/utils';
import Moment from 'react-moment';

// Generate Order Data
function createData(id, user, date, shipName, shipCity, paymentMethod) {
  return { id, user, date, shipName, shipCity, paymentMethod };
}


function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paging: {
    display: 'flex',
    justifyContent: 'center',
  }
}));

const FooterContent = (onChangePaging, allowSeeMore, totalCount, classes) => {
  if(allowSeeMore) {
    return (
      <div className={classes.seeMore}> 
        <Link color="primary" href="/orders" onClick={preventDefault}>
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

const Orders = (props) => {
  const classes = useStyles();
  const { orders, allowSeeMore, totalCount, onChangePaging } = props;
  let rows = []
  if (orders) {
    rows = orders.slice(0, 5).map((order) => {
      const user = order.user ? order.user.first_name + " " + order.user.last_name : ''
      const createdDate = (<Moment format="YYYY/MM/DD HH:mm:ss">
          {formatDateTime(order.created_at).toISOString()}
        </Moment>
        )
      return createData(order.id, user, createdDate, order.ship_name, order.ship_city, order.payment_method)
    })
  }
  return (
    <Aux>
      <Title>Recent Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Payment Method</TableCell>
            <TableCell>City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell > <Link href={`/order/${row.id}`} >{row.date}</Link></TableCell>
              <TableCell >{row.user ? row.user : 'Anonymous'}</TableCell>
              <TableCell>{row.shipName}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.shipCity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {FooterContent(onChangePaging, allowSeeMore, totalCount, classes)}
    </Aux>
  );
};

export default Orders;