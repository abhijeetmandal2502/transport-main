import { Container, Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import BreadCrumb from '../../components/BreadCrumb';
import BtnNewBooking from '../../components/buttons/NewBooking';
import { useSession, getSession } from 'next-auth/react';
import dateFormat from 'dateformat';
import TableComponent from '../../components/TableComponent';
import { useRouter } from 'next/router';
import { useState } from 'react';

const FinalPaymentList = ({ data }) => {
  const router = useRouter();
  const [rowsData, setRowsData] = useState(data);

  const { data: session } = useSession();
  const token = session.user.access_token;

  const column = [
    '#',
    'LR No.',
    'Booking Date',
    'Consignor Name',
    'Consignee Name',
    'From',
    'To',
    'Vehicle No',
    'Due Amount',
    'Action',
  ];

  const rows = [];
  if (rowsData.length > 0) {
    rowsData.map((item, i) => {
      rows.push([
        i + 1,
        item.lr_id,
        dateFormat(item.booking_date, 'dd/mm/yyyy'),
        item.consignor_name,
        item.consignee_name,
        item.from_location,
        item.to_location,
        item.vehicle_no.toUpperCase(),

        item.due_amount,
        <Button
          onClick={() => newRedirect(item.lr_id)}
          variant="outlined"
          key={i}
        >
          Close
        </Button>,
      ]);
    });
  }

  const totalPages = Math.ceil(rows.length / 10);

  const newRedirect = (path) => {
    router.push(`/account/final-payment-list/${path}`);
  };

  const searchString = (searchValue) => {
    const filteredRows = rowsData.filter((row) => {
      return row.lr_id
        .toLowerCase()
        .includes(
          searchValue.toLowerCase()
        );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };


  const reset = () => {
    setRowsData(data)
  }

  return (
    <>
      <BreadCrumb />
      <Container
        style={{
          alignItems: 'center',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              Final Payout LR/CN
            </Typography>
          </Grid>


        </Grid>
      </Container>

      <TableComponent
        column={column}
        rows={rows}
        totalPages={totalPages}
        searchName={'Search Via Location name'}
        searchString={searchString}
      />
    </>
  );
};

export default FinalPaymentList;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session !== null && session !== undefined) {
    const token = session.user.access_token;

    try {
      const req = await fetch(
        `${process.env.apiUrl}/vehicle-due-payments`,
        // `${process.env.apiUrl}/lr-bookings-status/unload`,
        {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const res = await req.json();
      if (res.status === 'success') {
        var data = res.data;
      } else {
        var data = [];
      }
    } catch (err) {

      var data = [];
    }
  } else {
    var data = [];
  }

  return { props: { data } };
}
