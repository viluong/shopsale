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
        <Pagination count={ totalCount ? totalCount / 6 : 1 } size="small" />
      </div>
    )
  }
}

const Orders = (props) => {
  const classes = useStyles();
  const { orders, allowSeeMore } = props;
  let rows = []
  if (orders) {
    rows = orders.slice(0, 5).map((order) => {
      const user = order.user ? order.user.first_name + " " + order.user.last_name : ''
      const createdDate = (<Moment format="YYYY/MM/DD HH:mm:ss">
          {formatDateTime(order.created_at).toString()}
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
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.user ? row.user : 'Anonymous'}</TableCell>
              <TableCell>{row.shipName}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell>{row.shipCity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {seeMore(allowSeeMore, 0, classes)}
    </Aux>
  );
};

export default Orders;