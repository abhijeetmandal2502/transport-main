import React, { useState } from 'react'
import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TableComponent from '../TableComponent';
import dateFormat from 'dateformat';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack'
import UpdateBilty from './UpdateBilty';

const LoadingLR = () => {

    const router = useRouter();
    const lrId = router.query.id
    const [pageStatus, setStatus] = useState(false)
    const [bilty, setBilty] = useState([]);

    const biltyArr = [];

    const { enqueueSnackbar } = useSnackbar();

    // / swr start
    const { data: session, status } = useSession();

    const token = session && session.user.access_token;

    const fetcher = (...args) =>
        fetch(...args, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        }).then((res) => res.json());


    const { data, error, mutate } = useSWR(
        `${process.env.apiUrl}/lr-booking/single/${lrId}`,
        fetcher
    );
    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;

    const rows = [];
    if (data) {
        const biltyData = data.data;
        if (biltyData) {
            var bilties = biltyData[0].bilties;
            bilties && Object.values(bilties).map((item, i) => {
                const date = dateFormat(item.date, "dd-mm-yyyy")
                rows.push([i + 1, item.packages, date, item.description, item.invoice_no, item.gst_no, item.shipment_no, parseFloat(item.weight), item.goods_value, <Button variant="contained" color="secondary" size="small" onClick={() => updateBilty(item)} key={i} >
                    Edit
                </Button>, <Button variant="contained" color="error" size="small" onClick={() => deleteBilty(item.id)} key={i} >
                    Delete
                </Button>])
            })
        }
        else {
            var bilties = [];
        }


    }

    const updateBilty = (items) => {
        setStatus(!pageStatus)
        setBilty(items);
    }


    const column = ["#", "Packages", "Date", "Description", "Invoice No.", "GST No.", "Shipment No.", "Weight", "Goods Value", "Update", "Delete"];


    // delete biltie
    const deleteBilty = async (id) => {
        try {
            const req = await fetch(`${process.env.apiUrl}/bilty/${id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                method: 'delete'
            });
            const res = await req.json();
            if (res.status === 'success') {
                const message = res.message;
                enqueueSnackbar(message, {
                    variant: 'success',
                });

                mutate(`${process.env.apiUrl}/lr-booking/single/${lrId}`);
            }
            else {
                const message = res.errors;
                enqueueSnackbar(message, {
                    variant: 'error',
                });
            }

        } catch (error) {
            enqueueSnackbar(error, {
                variant: 'error',
            });
        }
    }

    const callStatus = () => {
        setStatus(!pageStatus)
        mutate(`${process.env.apiUrl}/lr-booking/single/${lrId}`);
    }

    return (

        pageStatus == false ? <TableComponent rows={rows} column={column} searchName={''} searchString={''} totalPages={''} /> : <UpdateBilty bilty={bilty} setStatus={callStatus} pageStatus={pageStatus} />
    );
}

export default LoadingLR