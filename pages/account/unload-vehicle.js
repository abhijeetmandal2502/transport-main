import BreadCrumb from '../../components/BreadCrumb';
import TableComponent from '../../components/TableComponent';
import { useSession, getSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@mui/material';

import React, { useState } from 'react';
const UnloadVehicle = ({ data }) => {
  const column = [
    '#',
    'LR No.',
    'Consignee',
    'Consignor',
    'From',
    'To',
    'Vehicle No',
    'Driver',
    'Action',
  ];

  const rows = [];
  const [rowsData, setRowsData] = useState(data);

  if (rowsData !== null && rowsData !== undefined) {
    if (rowsData.length > 0) {
      rowsData.map((item, i) => {

        rows.push([
          i + 1,
          item.lr_id,
          item.consignor_name,
          item.consignee_name,
          item.from_location,
          item.to_location,
          item.vehicle_no.toUpperCase(),
          item.driver_name,
          // item.due_amount,
          <Link href={`/account/unload-vehicle/${item.lr_id}`} key={i}>
            <Button className="newbookingbtn" variant="outlined" size="small">
              Unload
            </Button>
          </Link>,
        ]);
      });
    }
  }
  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return row.lr_id
        .toLowerCase()
        .includes(
          searchValue.toLowerCase() ||
          row.vehicle_no.toLowerCase().includes(searchValue.toLowerCase())
        );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(data);
  };
  const totalPages = Math.ceil(rows.length / 10)
  return (
    <>
      <BreadCrumb />
      <TableComponent
        rows={rows}
        column={column}
        searchString={searchString}
        totalPage={totalPages}
        searchName={'Search here'}
      />
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
