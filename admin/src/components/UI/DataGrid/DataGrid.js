import * as React from 'react';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Aux from '../../../hocs/HightAux/HightAux';


let columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
];

let rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const editToolbar = (props) => {
  const { onClickAddNew } = props;
  return (
    <Aux>
      <Button color="primary" startIcon={<AddIcon />} onClick={onClickAddNew}>
        Add record
      </Button>
    </Aux>
  );
}


const renderDeleteButton = (id, handleDeleteClick) => {
  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick(id)}
      color="inherit"
    />
  )
}

const DataGridCustom = (props) => {
  let { style, onEditRowsModel, enableAddNew, onClickAddNew } = props

  style = style ? style : { minHeight: 150, width: '100%', paddingBottom: 20}

  const handleEditRowsModelChange = React.useCallback((model) => {
    onEditRowsModel(model);
  }, [onEditRowsModel]);

  if (props.getDataGridColumns) {
    columns = props.getDataGridColumns()
  }
  if (props.getDataGridRows) {
    rows = props.getDataGridRows(props.value)
  }

  if (props.enableDelete) {

    columns = [ 
      ...columns, 
      {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      headerAlign: 'right',
      editable: false,
      filterable: false,
      align: 'right',
      disableColumnMenu: true,
      disableReorder: true,
      sortable: false,
      renderCell: ({id}) => renderDeleteButton(id, handleDeleteClick)
    }]
  }    
  
  const handleDeleteClick = (id) => (event) => {
    event.stopPropagation();
    props.onDeleteRowDataGrid(id)
  } 

  return (
    <div style={style}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        components={{
          Toolbar: enableAddNew ? editToolbar : '',
        }}
        componentsProps={{
          toolbar: { onClickAddNew },
        }}
        disableSelectionOnClick
        // editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
      />
    </div>
  );
};

export default DataGridCustom;