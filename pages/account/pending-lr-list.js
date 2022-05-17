import CNBooking from '../../components/booking/CnBooking';
import { useState, useEffect } from 'react';
import { useSession, getSession } from 'next-auth/react';
import BreadCrumb from '../../components/BreadCrumb';
import { Container } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'lr_id',
        headerName: 'Cn No',
        width: 150,
        editable: true,
    },
    {
        field: 'consignor_name',
        headerName: 'Consignor Name',
        width: 200,
        editable: true,
    },
    {
        field: 'consignee_name',
        headerName: 'Consignee Name',
        width: 200,
        editable: true,
    },

    {
        field: 'from_location',
        headerName: 'From',
        width: 150,
        editable: true,
    },
    {
        field: 'to_location',
        headerName: 'To',
        width: 150,
        editable: true,
    },
    {
        field: 'amount',
        headerName: 'Amount',
        width: 'fitContent',
        editable: true,
    },

];



const PendingLrList = ({ data }) => {

    const rows = [];
    data.map((item) => {
        rows.push({})
    })


    return (
        <div>
            <Container
                style={{
                    alignItems: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <BreadCrumb />
            </Container>
            <div style={{ height: '600px', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setSelectionModel(newSelection.selectionModel);
                    }}
                    selectionModel={selectionModel}
                    components={{ Toolbar: GridToolbar }}

                />
            </div>

        </div>
    );
};

export default PendingLrList;

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    const rows = [];
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        try {
            const req = await fetch(`${process.env.apiUrl}/lr-bookings`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await req.json();
            var totalCount = 0;
            if (res.status === 'success') {
                var data = res.data;

                data.map((item, i) => {
                    const temprows = { id: i, lr_id: item.lr_id, consignor_name: item.consignor_name, consignee_name: item.consignee_name, from_location: item.from_location, to_location: item.to_location, amount: item.amount }
                    rows.push(temprows);
                })


            } else {
                var data = [];
            }
        } catch (err) {

            var data = [];
        }
    } else {
        var data = [];
    }

    return { props: { data, totalCount, rows } };
}


