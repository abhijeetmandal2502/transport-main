import React from 'react';
import { Typography, Grid } from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import TableComponent from '../../../components/TableComponent';
import { useState, useEffect } from 'react';
import dateFormat, { masks } from 'dateformat';
import { useRouter } from 'next/router';
import BillDetailsModel from '../../../components/BillDetailsModel';
import { AddBoxOutlined, Print } from '@material-ui/icons';

const ClosedBill = ({ data }) => {

    const router = useRouter();
    const { data: session } = useSession();
    const token = session.user.access_token;

    const [open, setOpen] = useState(false);
    const [bilties, setBilties] = useState([])
    const [consignorData, setConsignorData] = useState([]);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const column = ["#", "Bill No.", "Consignor", "Total Weight", "Amount", "Rec. Amount", "TDS", "View"];
    const rows = [];
    data.map((item, i) => {
        rows.push([i + 1, item.bill_no, item.consignor, item.total_weight, item.process_amount, item.received_amount, item.tds_amount, <AddBoxOutlined key={i} onClick={() => callApiData(item.id)} />]);
    })

    const totalPages = Math.ceil(rows / 10);
    const searchString = () => {

    }

    const PrintBill = (id) => {
        router.push(`/receipt/multiple-consignor-bill/${id}`)
    }


    // fetch custom FTL bill details 
    const callApiData = async (id) => {

        try {
            const req = await fetch(
                `${process.env.apiUrl}/offline-invoice/${id}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    method: 'GET',
                }
            );

            const res = await req.json();

            if (res.status === 'success') {
                const bill = res.data

                setBilties(bill.bilties)
                setConsignorData({ consignor: bill.consignor, gst_no: bill.gst_no, total_amount: bill.total_amount, total_weight: bill.total_weight });
                handleOpen();
            }
        }
        catch (err) {

        }
    }
    return (
        <>
            <BreadCrumb />
            <Grid container style={{ marginBottom: 15 }}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                        Processing LR Billing
                    </Typography>
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

            <TableComponent
                column={column}
                rows={rows}
                searchString={searchString}
                totalPages={totalPages}
                searchName={'Search Via Lr Number'}
            />
            <BillDetailsModel open={open} setOpen={setOpen} title={'Tesxt'} bilties={bilties} consignorData={consignorData} handleClose={handleClose} />
        </>
    );
};

export default ClosedBill;

export async function getServerSideProps(ctx) {
    // Fetch data from external API

    // get token from session
    const session = await getSession(ctx);
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;

        var data = [];
        try {
            const req = await fetch(
                `${process.env.apiUrl}/offline-invoice-status/closed`,
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
