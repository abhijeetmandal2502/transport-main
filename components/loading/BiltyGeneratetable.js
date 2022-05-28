import React, { useState, createContext } from 'react';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Input,
  Divider,
  Stack,
  PaginationItem,
  Pagination,
  Button,
} from '@mui/material';

// import useSWR from 'swr';
import TableComponent from '../TableComponent';
import { BiltyDataContext } from '../../helpers/BiltyData';
import { useRouter } from 'next/router';
import DataNotAvl from '../DataNotAvl';

const PassBtnComponent = (props) => {
  const { boookingNo, shipmentNo } = props;
  const router = useRouter();
  const path =
    boookingNo != null && boookingNo !== undefined
      ? `/loading/generate-new-bilty/${boookingNo}`
      : `/loading/generate-new-bilty/`;

  const shipmentId =
    shipmentNo == undefined || shipmentNo == null ? '' : shipmentNo;
  return (
    <Button
      className="newbookingbtn"
      variant="outlined"
      size="small"
      onClick={() => {
        router.push(
          {
            pathname: path,
            query: {
              shipmentId: shipmentId,
            },
          },
          path
        );
      }}
    >
      Generate New Bilty
    </Button>
  );
};

const ViewBiltyBtn = (props) => {
  const { id, bilties } = props;
  const router = useRouter();

  return (
    <Button
      className="newbookingbtn"
      variant="outlined"
      size="small"
      onClick={() => {
        const bilty =
          bilties == undefined || bilties.length == 0 ? [] : bilties;

        const data = [
          { name: 'saurabh', gender: 'male' },
          { name: 'saurabh', gender: 'male' },
        ];
        router.push(
          {
            pathname: `/loading/view-bilty/${id}`,
          },
          `/loading/view-bilty/${id}`
        );
      }}
    >
      View Bilty
    </Button>
  );
};

const BiltyGenerateTable = (props) => {
  const { biltyData } = props;
  const router = useRouter();

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const columns = [
    'Sl No',
    'LR No',
    'No Of Bilty',
    'Consignor Name',
    'Consignee Name',
    'From Location',
    'To Location',
    'Vehicle No',

    'Driver Name',
    'Driver Contact No',
    'Add Bilty  ',
    'View Bilty ',
    // 'Update'
  ];

  const [rowsData, setRowsData] = useState(biltyData.data);


  const rows = [];
  var i = 1;
  if (rowsData !== undefined && rowsData !== null) {
    if (rowsData.length > 0) {
      rowsData.map((item) => {
        rows.push([
          i + '.',
          item.lr_id,
          item.bilty_count,
          item.consignor_name,
          item.consignee_name,
          item.from_location,
          item.to_location,
          item.vehicle_no.toUpperCase(),
          item.driver_name,
          item.driver_mobile,

          <PassBtnComponent
            boookingNo={item.lr_id}
            shipmentNo={item.shipment_no}
            key={i}
          />,
          item.bilties.length > 0 ? (
            <ViewBiltyBtn id={item.lr_id} bilties={item.bilties} key={i} />
          ) : (
            '----'
          ),
        ]);
        i++;
      });
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const searchString = (searchValue) => {
    if (searchValue != null) {
    }
    const filteredRows = rowsData.filter((row) => {
      return (
        row.vehicle_no.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.driver_name.toLowerCase().includes(searchValue.toLowerCase()) ||
        row.lr_id.toLowerCase().includes(searchValue.toLowerCase())
      );
    });

    setRowsData(filteredRows);

    if (searchValue === '') {
      reset();
    }
  };

  const reset = () => {
    setRowsData(biltyData.data);
  };

  return (
    <BiltyDataContext.Provider value={biltyData.data}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }} elevation={5}>
        {biltyData != undefined ? (
          <TableComponent
            rows={rows}
            column={columns}
            searchString={searchString}
            totalPage={5}
            searchName={'Search By Name'}
          />
        ) : (
          <DataNotAvl />
        )}
      </Paper>
    </BiltyDataContext.Provider>
  );
};

export default BiltyGenerateTable;
