import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';

import { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/router';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PendingBills from '../../components/account/ftl/PendingBills';
import { useSnackbar } from 'notistack';

const columns = [
    { field: 'id', headerName: '#' },
    {
        field: 'lr_no',
        headerName: 'Cn No',
        width: 200,
        editable: true,
    },
    {
        field: 'consignor',
        headerName: 'Consignor Name',
        width: 300,
        editable: true,
    },
    {
        field: 'consignee',
        headerName: 'Consignee Name',
        width: 300,
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
        width: '100',
        editable: true,
    },
    {
        field: 'booking_date',
        headerName: 'Booking Date',
        width: '150',
        editable: true,
    },
    {
        field: 'shipment_no',
        headerName: 'ShipMent No.',
        width: '150',
        editable: true,
    },
    {
        field: 'total_weight',
        headerName: 'Weight',
        width: '100',
        editable: true,
    },
    {
        field: 'vehicle_no',
        headerName: 'Vehicle No.',
        width: '150',
        editable: true,
    },
    {
        field: 'vehicle_type',
        headerName: 'Vehicle Type',
        width: '150',
        editable: true,
    },
    {
        field: 'driver_name',
        headerName: 'Driver',
        width: '150',
        editable: true,
    },
    {
        field: 'driver_mobile',
        headerName: 'Driver Mobile',
        width: '150',
        editable: true,
    }

];

const Bills = ({ data }) => {
    console.log("data", data)

    const [showTable, setShowTable] = useState(false);


    const { enqueueSnackbar } = useSnackbar();

    const { data: session } = useSession();
    const token = session.user.access_token;

    const router = useRouter();

    // rows data is pushing to array for grid mui structure

    const rows = [];
    // data.map((item, i) => {
    //     const bookingDate = dateFormat(item.booking_date, "dd/mm/yyyy");
    //     rows.push({ id: i + 1, lr_no: item.lr_no, consignor: item.consignor, consignee: item.consignee, from_location: item.from_location, to_location: item.to_location, amount: item.amount, booking_date: bookingDate, shipment_no: item.shipment_no, total_weight: item.total_weight, vehicle_no: item.vehicle_no.toUpperCase(), vehicle_type: item.vehicle_type, driver_name: item.driver_name, driver_mobile: item.driver_mobile })
    // })



    return (
        <>
            <BreadCrumb />
            <Grid container style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={6} md={12} style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                        Pending Bills
                    </Typography>
                    {
                        showTable === false ? <Button variant="contained" color="secondary" size="small" style={{ border: "1px solid  #146ec7" }} onClick={() => generateBill()} >Genrate Bill</Button> : <Button variant="contained" color="secondary" size="small" style={{ border: "1px solid  #146ec7" }} onClick={() => setShowTable(!showTable)} >Back</Button>
                    }

                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                        }}
                    ></Box>
                </Grid>
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                onSelectionModelChange={(ids) => {
                    setChecked(ids);
                }}
                components={{ Toolbar: GridToolbar }}


            />

        </>
    );
};

export default Bills;

export async function getServerSideProps(ctx) {

    // get token from session
    const session = await getSession(ctx);
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        var data = [];
        try {
            const req = await fetch(
                `${process.env.apiUrl}/lr-bookings-status/unload`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
                }
            );
            var res = await req.json();

            if (res.status === 'success') {
                data = res.data;
            } else {
                data = [];
            }
        } catch (error) {
            data = [];
        }
    } else {
        var data = [];
    }

    // Pass data to the page via props
    return { props: { data } };
}
