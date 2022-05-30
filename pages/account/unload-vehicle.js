import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@mui/material';

import React, { useState } from 'react';
import DataGridComponent from '../../components/DataGridComponent';

const UnloadVehicle = ({ data }) => {

  console.log("data", data)
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
      field: 'consignee',
      headerName: 'Consignee',
      width: 300,
      editable: true,
    },
    {
      field: 'consignor',
      headerName: 'Consignor',
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
      field: 'driver',
      headerName: 'Driver',
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
          <Link href={`/account/unload-vehicle/${slug}`}  >
            <Button variant="contained" size="small" style={{ fontSize: '9px', fontWeight: 700 }}>
              Unload
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
      consignor: item.consignor_name,
      consignee: item.consignee_name,
      from: item.from_location,
      to: item.to_location,
      vehicleNo: item.vehicle_no.toUpperCase(),
      driver: item.driver_name,
      redirect: ''
    });
  })

  return (
    <>
      <BreadCrumb />
      <DataGridComponent rows={rows} columns={columns} />
    </>
  );
};

export default UnloadVehicle;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session !== null && session !== undefined) {
    const token = session.user.access_token;
    try {
      const req = await fetch(
        // `${process.env.apiUrl}/vehicle-due-payments`,
        `${process.env.apiUrl}/lr-bookings-status/loading`,
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
