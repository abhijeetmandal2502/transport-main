import { Container, Grid, Typography, Button } from '@mui/material';
import BreadCrumb from '../../components/BreadCrumb';
import { useSession, getSession } from 'next-auth/react';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Link from 'next/link';
import DataGridComponent from '../../components/DataGridComponent';

const FinalPaymentList = ({ data }) => {
  const router = useRouter();
  const [rowsData, setRowsData] = useState(data);

  const { data: session } = useSession();
  const token = session.user.access_token;

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 60,
    },
    {
      field: 'cn',
      headerName: 'LR No.',
      width: 150,
      editable: true,
    },
    {
      field: 'bookingDate',
      headerName: 'Booking Date',
      width: 150,
    },
    {
      field: 'consignor',
      headerName: 'consignor',
      width: 300,
      editable: true,
    },
    {
      field: 'consignee',
      headerName: 'Consignee',
      width: 300,
      editable: true,
    },
    {
      field: 'from',
      headerName: 'From',
      width: 110,
      editable: true,
    },
    {
      field: 'to',
      headerName: 'To',
      width: 110,
      editable: true,
    },
    {
      field: 'vehicleNo',
      headerName: 'vehicle No',
      width: 110,
      editable: true,
    },
    {
      field: 'due',
      headerName: 'Due Amount',
      width: 110,
      editable: true,
    },
    {
      field: 'redirect',
      headerName: 'Action',
      width: 110,
      editable: true,
      renderCell: (params, i) => {
        var slug = params.row.cn;
        return (
          <Link href={`/account/final-payment-list/${slug}`}  >
            <Button variant="contained" size="small" style={{ fontSize: '9px', fontWeight: 700 }}>
              pay
            </Button>
          </Link>
        );
      }
    },
  ];

  const rows = [];
  data.map((item, i) => {
    rows.push({
      id: i + 1,
      cn: item.lr_id,
      bookingDate: dateFormat(item.booking_date, 'dd/mm/yyyy'),
      consignor: item.consignor_name,
      consignee: item.consignee_name,
      from: item.from_location,
      to: item.to_location,
      vehicleNo: item.vehicle_no.toUpperCase(),

      due: item.due_amount,
      redirect: ''
    });
  });

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

      <DataGridComponent rows={rows} columns={columns} />
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
