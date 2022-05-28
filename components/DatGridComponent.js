import React from 'react'
import { DataGrid, GridToolbar, QuickSearchToolbar } from '@mui/x-data-grid';

const DatGridComponent = ({ rows, columns }) => {
    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                columns={columns}
                rows={rows}
                pageSize={10}
                rowsPerPageOptions={[10]}
                components={{ Toolbar: GridToolbar }}
            />
        </div>
    )
}

export default DatGridComponent