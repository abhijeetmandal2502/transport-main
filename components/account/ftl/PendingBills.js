import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material'
import { textAlign } from '@mui/system'
import React from 'react'

const PendingBills = ({ billingArray, billingAmount, submitform }) => {



    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell component="th" scope="row">#</TableCell>
                            <TableCell component="th" scope="row">LR No.</TableCell>
                            <TableCell component="th" scope="row">Consignee</TableCell>
                            <TableCell component="th" scope="row">Consignor</TableCell>
                            <TableCell component="th" scope="row">From</TableCell>
                            <TableCell component="th" scope="row">To</TableCell>
                            <TableCell component="th" scope="row">Vehicle Type</TableCell>
                            <TableCell component="th" scope="row">Weight</TableCell>
                            <TableCell component="th" scope="row">Billing Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            billingArray.map((item, key) => {

                                return (
                                    <TableRow key={key}

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell component="th" scope="row">{key + 1}</TableCell>
                                        <TableCell>{item.lr_no}</TableCell>
                                        <TableCell>{item.consignee}</TableCell>
                                        <TableCell>{item.consignor}</TableCell>
                                        <TableCell>{item.from_location}</TableCell>
                                        <TableCell>{item.to_location}</TableCell>
                                        <TableCell>{item.vehicle_type}</TableCell>
                                        <TableCell>{parseFloat(item.total_weight) + ' Kg'}</TableCell>
                                        <TableCell>{item.amount}</TableCell>

                                    </TableRow>
                                )
                            })
                        }
                        <TableRow>
                            <TableCell component="th" scope="row" colSpan={8} style={{ fontWeight: '700' }} >Total</TableCell>
                            <TableCell component="th" scope="row" style={{ fontWeight: '700' }}  >{billingAmount}</TableCell>

                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box style={{ textAlign: "end", marginTop: 20 }}><Button variant="contained" style={{}} onClick={submitform}  >Submit</Button></Box>
        </>

    )
}

export default PendingBills