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
import ConsignorPaymentClear from '../../../components/account/ConsignorPaymentClear';

const UpdateBiltyStatus = () => {
  const router = useRouter();
  const biltyNo = router.query.biltyNo[1];



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
    `${process.env.apiUrl}/bilties/${biltyNo}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  var res = [];
  if (data.status === 'success') {
    res = data.data;
  }

  return (
    <>


      <Container
        style={{
          // alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <BreadCrumb />
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
      {/* part for add custom design and grid system */}
      {data.status === 'success' ? <ConsignorPaymentClear info={res} /> : null}
    </>
  );
};

export default UpdateBiltyStatus;
