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
        <Pagination count={ (totalCount / 6) > Math.floor(totalCount / 6) ? Math.floor(totalCount / 6) + 1 : Math.floor(totalCount / 6) } size="small" onChange={onChangePaging} />
      </div>
    )
  }
}

const ListItem = (props) => {
  const { rowData, data, allowSeeMore, title, totalCount, onChangePaging, currentPage } = props;
  const heightRow = props.heightRow ? props.heightRow : 60;
  const rowPerPage = props.rowPerPage ? props.rowPerPage: 6;
  const classes = useStyles();
  const emptyRows = currentPage > 0 ? Math.max(0, rowPerPage - data.length) : 0;
  return (
    <Aux>
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {
              rowData.map((row) => (
                <TableCell>{row.label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((item) => (
              <TableRow style={{ height: heightRow }} key={item.id} onClick={props.handleClick}>
                {
                  rowData.map((row) => {
                    return (
                    <TableCell {...row.styles} >{
                      row.renderValue ? 
                        row.renderValue({...item, styleName: classes.image }) : 
                          item[row.name]
                      }
                      </TableCell>)
                  })
                }
              </TableRow>
            ))
          }
          {emptyRows > 0 && (
            <TableRow style={{ height: heightRow * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      {FooterContent(onChangePaging, allowSeeMore, totalCount, classes)}
    </Aux>
  );
};

export default ListItem;