import React from 'react';
import { DataGrid, esES } from '@mui/x-data-grid';
import './common.css'
import { setGlobalPerPage } from '../../../utils/objects';

const DatagridTable = ({ data, handlePageChange, handlePageSizeChange, perPage, page, isLoading, total }) => {
  const [columns, rows] = data;
  return (
    <DataGrid
      loading={isLoading}
      editMode='row'
      paginationMode='server'
      rows={rows}
      columns={columns}
      rowsPerPageOptions={[5, 10, 20, 100]}
      pageSize={perPage}
      page={page - 1}
      rowCount={total}
      onPageChange={handlePageChange}
      onPageSizeChange={size => {
        setGlobalPerPage(size)
        handlePageSizeChange(size)
      }}
      onFilterModelChange={(filters) => console.log(filters)}
      disableSelectionOnClick
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    />
  )
}


export default DatagridTable;