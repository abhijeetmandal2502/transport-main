import { AspectRatio, Lock } from "@material-ui/icons";
import { Box, FormGroup, Grid, Input, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import React from "react";



function createData(Packages, Discription, ActualWeight, Rate, Amount) {
    return { Packages, Discription, ActualWeight, Rate, Amount };
}

const rows = [
    createData('', '', '', 'Hamali', ''),
    createData(' ', '', '', 'Sur.Ch', ''),
    createData(' ', '', '', 'St.Ch', ''),
    createData(' ', 'Invoice No. -', '', 'Risk.Ch', ''),
    createData(' ', 'Date -', '', 'Total', ''),
];


const Truckassociationinvoice = () => {
    return (
        <div>
            {/* for mobile */}

            <Grid container spacing={2} style={{ padding: 16 }} sx={{ display: { xs: 'block', sm: 'none' } }}>
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography
                            style={{ textAlign: "center", fontWeight: "bolder" }}
                            variant="h3"
                        >
                            Truck Association
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline' }}>
                            FLEET OWNERS AND TRANSPORT CONTRACTORS
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Sidkul Road, Sitarganj-262405(Udham Singh Nagar) Uttarakhand
                        </Typography>
                    </Box>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography style={{ textAlign: 'center', fontWeight: "bolder" }} variant="h6">
                            SIDKUL SITARGANJ
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 16 }}>
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
                            GSTIN: 05ADRGHFGHJ
                        </Typography>
                        <Typography sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
                            PAN: 05ADRGHFGHJ
                        </Typography>
                        <Typography sx={{ textAlign: { xs: 'center', sm: 'start' } }}>
                            Reg. No: 05ADRGHFGHJ
                        </Typography>
                    </Box>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography style={{ textAlign: 'center' }}>
                            All Disputes are subject to u.s.Nagar Jurisdiction only
                        </Typography>
                    </Box>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography sx={{ textAlign: { xs: 'center', sm: 'end' } }}>
                            Email: Truckassociation.stg.gmail.com
                        </Typography>
                        <Typography sx={{ textAlign: { xs: 'center', sm: 'end' } }}>
                            Mobile No. : 1324568974, 4521369857, 7896541235, 5462318975
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 16 }} sx={{ display: { xs: 'none', sm: 'flex' } }} >
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={3} sx={{ display: { xs: 'none', sm: 'block' } }}>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography
                            style={{ textAlign: "center", fontWeight: "bolder" }}
                            variant="h3"
                        >
                            Truck Association
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', textDecoration: 'underline' }}>
                            FLEET OWNERS AND TRANSPORT CONTRACTORS
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }}>
                            Sidkul Road, Sitarganj-262405(Udham Singh Nagar) Uttarakhand
                        </Typography>
                    </Box>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography style={{ textAlign: 'center', fontWeight: "bolder" }} variant="h6">
                            SIDKUL SITARGANJ
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 16, justifyContent: 'center', }}>
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={5}>
                    <Paper style={{ border: '1px solid #00000052', padding: '10px', borderRadius: '5px', }}>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} >
                            CAUTION
                        </Typography>
                        <Typography style={{ textAlign: 'start' }}>
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.
                        </Typography>
                    </Paper>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={2}>
                    <Box>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px', }}>
                            AT OWNERS RISK INSURANCE
                        </Typography>
                    </Box>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={5}  >
                    <Paper style={{ border: '1px solid #00000052', padding: '10px', borderRadius: '5px', }}>
                        <Typography style={{ textAlign: 'start' }}>
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry Lorem Ipsum is simply dummy text of the printing.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 16, justifyContent: 'center', }}>
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={4}>
                    <Paper sx={{ height: { xs: 'auto', sm: '200px' } }} style={{ border: '1px solid #00000052', padding: '10px', borderRadius: '5px', }} >

                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} >
                            CONSIGNMENT NOTE
                        </Typography>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ fontWeight: 'bold', color: 'black', marginRight: '20px', }}>NO.</InputLabel>
                            <Input />
                        </FormGroup>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px' }}>DATE.</InputLabel>
                            <Input />
                        </FormGroup>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px' }}>LORRY NO.</InputLabel>
                            <Input />
                        </FormGroup>

                    </Paper>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={4}  >
                    <Paper sx={{ height: { xs: 'auto', sm: '200px' } }} style={{ border: '1px solid #00000052', padding: '10px', borderRadius: '5px', }} >
                        <Typography style={{ textAlign: 'start' }}>
                            {" "}
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.
                        </Typography>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px' }}>COMPANY.</InputLabel>
                            <Input />
                        </FormGroup>
                        <Grid container spacing={2}   >
                            <Grid item xs={7}>
                                <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                                    <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px', }}>POLICY NO.</InputLabel>
                                    <Input style={{ width: '56%', }} />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={5}>
                                <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                                    <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px' }}>DATE.</InputLabel>
                                    <Input style={{ width: '56%', }} />
                                </FormGroup>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}   >
                            <Grid item xs={7}>
                                <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                                    <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px', }}>AMOUNT.</InputLabel>
                                    <Input style={{ width: '56%', }} />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={5}>
                                <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                                    <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '12px' }}>RISK.</InputLabel>
                                    <Input style={{ width: '56%', }} />
                                </FormGroup>
                            </Grid>
                        </Grid>

                    </Paper>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={4}  >
                    <Paper sx={{ height: { xs: 'auto', sm: '200px' } }} style={{ border: '1px solid #00000052', padding: '10px', borderRadius: '5px', }} >
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} >
                            NOTICE
                        </Typography>
                        <Typography style={{ textAlign: 'start' }}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={2} style={{ padding: 16, justifyContent: 'center', }}>
                <Grid item xs={12} sm={9}>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                        <InputLabel style={{ color: 'black', marginRight: '20px', }}>Consignores Name And Address.</InputLabel>
                        <Input sx={{ width: { xs: '100%', sm: '70%' } }} />
                    </FormGroup>
                    <Input style={{ width: '100%', }} />
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                        <InputLabel style={{ color: 'black', marginRight: '20px', }}>Consignee Name And Address.</InputLabel>
                        <Input sx={{ width: { xs: '100%', sm: '72%' } }} />
                    </FormGroup>
                    <Input style={{ width: '100%', }} />
                </Grid>
                <Grid item xs={12} sm={3}  >
                    <Paper style={{ border: '1px solid #00000052', marginBottom: '10px', padding: '10px', borderRadius: '5px', }} >
                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ marginRight: '10px', }}>
                                From
                            </Typography>
                            <Typography style={{ textAlign: 'center', fontWeight: 'bold' }} >
                                SITARGANJ
                            </Typography>
                        </Box>
                    </Paper>
                    <Paper style={{ border: '1px solid #00000052', marginBottom: '10px', padding: '10px', borderRadius: '5px', }} >
                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ marginRight: '10px', }}>
                                To
                            </Typography>
                            <Input />
                        </Box>
                    </Paper>
                    <Paper style={{ border: '1px solid #00000052', marginBottom: '10px', padding: '10px', borderRadius: '5px', }} >
                        <Box style={{ display: 'flex' }}>
                            <Typography style={{ marginRight: '10px', }}>
                                Shippment No
                            </Typography>
                            <Input />
                        </Box>
                    </Paper>
                </Grid>

            </Grid>

            <Box style={{ padding: 16 }} >
                <TableContainer sx={{ border: '1px solid gray' }} component={Paper}>
                    <Table aria-label="simple table"  >
                        <TableHead id="invoiceTable">
                            <TableRow>
                                <TableCell>Packages</TableCell>
                                <TableCell align="right">Discription(Said to Contain)</TableCell>
                                <TableCell align="right">Actual Weight</TableCell>
                                <TableCell align="right">Rate</TableCell>
                                <TableCell align="right">Amunt to Pay/Paid</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody id="invoicetbody">
                            {rows.map((row) => (
                                <TableRow
                                    key={row.Packages}
                                //  sx={{ '#invoicelasttd:last-child, #invoicelasttd:last-child': { borderTop: 1, } }}
                                >
                                    <TableCell > {row.Packages}</TableCell>
                                    <TableCell align="left">{row.Discription}</TableCell>
                                    <TableCell align="right">{row.ActualWeight}</TableCell>
                                    <TableCell className="invoicelasttd" align="right">{row.Rate}</TableCell>
                                    <TableCell className="invoicelasttd" align="right">{row.Amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Grid container spacing={2} style={{ padding: 16 }}>
                {/* grid first item */}{" "}
                <Grid item xs={12} sm={6}>
                    <Box>
                        <Typography style={{ textAlign: 'start' }}>
                            Note: No Responsibility for Leakage and Damage.
                        </Typography>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ color: 'black', marginRight: '20px', }}>Consignores Name And Address.</InputLabel>
                            <Input sx={{ width: { xs: '100%', sm: '55%' } }} />
                        </FormGroup>
                    </Box>
                </Grid>
                {/* grid second item */}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography style={{ textAlign: 'start' }}>
                            GSTIN
                        </Typography>
                    </Box>
                </Grid>
                {/* grid third item */}
                <Grid item xs={12} sm={3}>
                    <Box>
                        <Typography style={{ textAlign: 'start' }}>
                            Signiture Of Booking Clerk
                        </Typography>
                    </Box>
                </Grid>
            </Grid>

        </div>
    );
};

export default Truckassociationinvoice;
