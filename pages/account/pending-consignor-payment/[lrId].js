import React from 'react';
import {
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Box, Button, Container } from '@mui/material';
import BreadCrumb from '../../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import TableComponent from '../../../components/TableComponent';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';

const PendingBiltyPayment = () => {
  const router = useRouter();
  const lrNo = router.query.lrId;
  const asPath = router.asPath;

  const { data: session } = useSession();
  const token = session.user.access_token;

  const fetcher = (...args) =>
    fetch(...args, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }).then((res) => res.json());

  const { data, error } = useSWR(
    `${process.env.apiUrl}/lr-bilties/${lrNo}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const column = [
    '#',
    'Invoice No',
    'Shipment No',
    'Package Unit',
    'Package Price',
    'Total Weight',
    'Description',
    'Status',
    'View',
    'Action',
  ];

  const rows = [];
  if (data.status === 'success') {
    const rowsData = data.data;
    rowsData.map((item, i) => {
      rows.push([
        i + 1,
        item.invoice_no,
        item.shipment_no,
        item.packages + ' pcs',
        item.goods_value,
        item.weight + item.unit,
        item.description,
        <Button variant="outlined" size="small" color="success" key={i}>
          {item.payment_status}
        </Button>,
        item.payment_status !== 'pending' ? (
          <Button
            variant="outlined"
            size="small"
            color="primary"
            //   ${item.id}
            onClick={() => router.push(`/receipt/truck-association/${item.id}`)}
            key={i}
          >
            View
          </Button>
        ) : (
          '--------'
        ),
        <Button
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => router.push(`${asPath}/${item.id}`)}
          key={i}
        >
          Update
        </Button>,
      ]);
    });

  }
  else {

  }



  return (
    <>
      <BreadCrumb />

      <Container
        style={{
          // alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              Pending Bilty Payment
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
      </Container>
      <TableComponent column={column} rows={rows} />
    </>
  );
};

export default PendingBiltyPayment;
