import { AspectRatio, Lock } from "@material-ui/icons";
import { Box, Divider, FormGroup, Grid, Input, InputLabel, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { fontWeight } from "@mui/system";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import PropTypes from 'prop-types';
import { biltyInvoiceData } from "../Utils"
import { useRouter } from 'next/router'
import { capitalize } from "@material-ui/core";


function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
                p: 1,
                m: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};




const ComponentToPrint = React.forwardRef((props, ref) => {
    const { data, invoiceName } = props


    const biltyInfo = data.bilty

    const consignorAddress = data.consignor_address1 + ', ' + data.consignor_address2 + ', ' + data.consignor_city + ', ' + data.consignor_country;
    const consigneeAddress = data.consignee_address1 + ', ' + data.consignee_address2 + ', ' + data.consignee_city + ', ' + data.consignee_country;

    return (

        <div ref={ref} >

            <Box
                sx={{
                    display: 'grid',
                    gridAutoColumns: '1fr',
                    gap: 1,
                }}
            >
                <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
                    <Box>
                        <Typography sx={{ textAlign: 'start' }} style={{ fontSize: '11px' }}>
                            GSTIN: {biltyInvoiceData.gst}
                        </Typography>
                        <Typography sx={{ textAlign: 'start' }} style={{ fontSize: '11px' }}>
                            PAN: {biltyInvoiceData.pan}
                        </Typography>
                        <Typography sx={{ textAlign: 'start' }} style={{ fontSize: '11px' }}>
                            Reg. No: {biltyInvoiceData.regNo}
                        </Typography>
                    </Box>
                </Item>
                <Item sx={{ gridRow: '1', gridColumn: 'span 2' }} style={{ border: 'none' }}>
                    <Box>
                        <Typography style={{ textAlign: 'center', fontSize: '11px' }} >
                            {biltyInvoiceData.topbarInfo}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            style={{ textAlign: "center", fontWeight: "bolder" }}
                            variant="h6"
                        >
                            {biltyInvoiceData.parentTitle}
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontSize: '11px', fontWeight: 'bold', textDecoration: 'underline' }}>
                            {biltyInvoiceData.childTitle}
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11px' }}>
                            {biltyInvoiceData.subChild}
                        </Typography>

                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>
                            ({capitalize(invoiceName)})
                        </Typography>
                    </Box>
                </Item>
                <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
                    <Box>
                        <Typography sx={{ textAlign: 'end' }} style={{ fontSize: '11px', fontWeight: 'bold' }}>
                            Email:
                        </Typography>
                        <Typography sx={{ textAlign: 'end' }} style={{ fontSize: '11px' }}>
                            {biltyInvoiceData.email}
                        </Typography>
                        <Typography sx={{ textAlign: 'end' }} style={{ fontSize: '11px', fontWeight: 'bold' }}>
                            Mobile No. :
                        </Typography>
                        <Typography sx={{ textAlign: 'end' }} style={{ fontSize: '11px' }}>
                            {biltyInvoiceData.mobile}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography style={{ textAlign: 'center', fontWeight: "bolder", fontSize: '11px' }}   >
                            {biltyInvoiceData.sidculInfo}
                        </Typography>
                    </Box>
                </Item>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <Item>
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11px', marginTop: '-17px' }} >
                        <span style={{ background: "white" }}>CAUTION</span>
                    </Typography>
                    <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                        {biltyInvoiceData.caution}
                    </Typography>
                </Item>
                <Item style={{ border: 'none' }}>
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px', fontSize: '11px' }}>
                        AT OWNER&#39;S RISK INSURANCE
                    </Typography>
                </Item>
                <Item>
                    <Typography style={{ textAlign: 'start', fontSize: '11px' }}  >
                        {biltyInvoiceData.chargesNote}
                    </Typography>
                </Item>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <Item>
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11px' }} >
                        CONSIGNMENT NOTE
                    </Typography>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ fontWeight: 'bold', color: 'black', fontSize: '11px' }}>NO.</InputLabel>
                        <Input style={{ fontSize: '11px', width: '170px' }} />
                    </FormGroup>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ color: 'black', fontSize: '11px' }}>DATE - </InputLabel>
                        <Input style={{ width: '170px', fontSize: '11px' }} value={data.lr_date} readOnly />
                    </FormGroup>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ color: 'black', fontSize: '11px' }}>LORRY NO.</InputLabel>
                        <Input style={{ width: '170px', fontSize: '11px' }} value={data.lr_id} readOnly />
                    </FormGroup>
                </Item>
                <Item>
                    <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                        The Consignor has started that: he has not insured the consignment OR he has insured the Consignment
                    </Typography>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ color: 'black', fontSize: '11px' }}>COMPANY.</InputLabel>
                        <Input style={{ width: '170px', fontSize: '11px' }} />
                    </FormGroup>

                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Item style={{ padding: '1px  ', margin: '1px 1px 0px 0px', border: 'none' }}>
                            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <InputLabel style={{ color: 'black', fontSize: '11px' }}>POLICY NO.</InputLabel>
                                <Input style={{ fontSize: '11px' }} />
                            </FormGroup>
                        </Item>
                        <Item style={{ padding: '1px  ', margin: '1px 1px 0px 0px', border: 'none' }}>
                            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <InputLabel style={{ color: 'black', fontSize: '11px' }}>AMOUNT.</InputLabel>
                                <Input style={{ fontSize: '11px' }} />
                            </FormGroup>
                        </Item>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                        <Item style={{ padding: '1px  ', margin: '1px 1px 0px 0px', border: 'none' }}>
                            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <InputLabel style={{ color: 'black', fontSize: '11px' }}>DATE.</InputLabel>
                                <Input style={{ fontSize: '11px' }} />
                            </FormGroup>
                        </Item>
                        <Item style={{ padding: '1px  ', margin: '1px 1px 0px 0px', border: 'none' }}>
                            <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <InputLabel style={{ color: 'black', fontSize: '11px' }}>RISK.</InputLabel>
                                <Input style={{ fontSize: '11px' }} />
                            </FormGroup>
                        </Item>
                    </Box>

                </Item>
                <Item>
                    <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11px' }} >
                        NOTICE
                    </Typography>
                    <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                        {biltyInvoiceData.notice}
                    </Typography>
                </Item>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridAutoColumns: '1fr',
                    gap: 1,
                }}
            >
                <Item sx={{ gridRow: '1', gridColumn: 'span 3' }}>
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ color: 'black', fontSize: '11px' }}>Consignore&#39;s Name And Address.</InputLabel>
                        <Input sx={{ width: '69%' }} style={{ fontSize: '11px', color: "black" }} value={data.consignor_name} readOnly />
                    </FormGroup>
                    <Input sx={{ width: '100%' }} style={{ fontSize: '11px' }} value={consignorAddress} readOnly />
                    <FormGroup style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputLabel style={{ color: 'black', fontSize: '11px' }}>Consignee Name And Address.</InputLabel>
                        <Input sx={{ width: '69%' }} style={{ fontSize: '11px' }} value={data.consignee_name} readOnly />
                    </FormGroup>
                    <Input value={consigneeAddress} sx={{ width: '100%' }} style={{ fontSize: '11px' }} readOnly />
                </Item>
                <Item sx={{ gridRow: '1', gridColumn: '4 / 5' }} style={{ padding: '0px' }}>
                    <Box style={{ display: 'flex', padding: '8px' }} >
                        <Typography style={{ marginRight: '10px', fontSize: '11px' }}>
                            From
                        </Typography>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '11px' }} >
                            {data.from_location}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box style={{ display: 'flex', padding: '8px' }}>
                        <Typography style={{ marginRight: '10px', fontSize: '11px' }}>
                            To
                        </Typography>
                        <Input style={{ fontSize: '11px' }} value={data.to_location} readOnly />
                    </Box>
                    <Divider />
                    <Box style={{ display: 'flex', padding: '8px' }}>
                        <Typography style={{ marginRight: '10px', fontSize: '11px' }}>
                            Shippment No
                        </Typography>
                        <Input style={{ fontSize: '11px' }} value={data.shipment_no} readOnly />
                    </Box>
                </Item>
            </Box>

            <Box style={{ padding: 8 }} >
                <TableContainer sx={{ border: '1px solid #e0e0e0' }}  >
                    <Table aria-label="simple table"  >
                        <TableHead id="invoiceTable">
                            <TableRow>
                                <TableCell>Packages</TableCell>
                                <TableCell align="right">Discription(Said to Contain)</TableCell>
                                <TableCell align="right">Actual Weight</TableCell>
                                <TableCell align="right">Rate</TableCell>
                                <TableCell align="right">Amount to Pay/Paid</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody id="invoicetbody">
                            <TableRow>
                                <TableCell >{biltyInfo.package} </TableCell>
                                <TableCell align="left">{biltyInfo.description}</TableCell>
                                <TableCell align="right">{biltyInfo.weight}</TableCell>
                                <TableCell className="invoicelasttd" align="right">{biltyInfo.goods_value}</TableCell>
                                <TableCell className="invoicelasttd" align="right">{biltyInfo.goods_value}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell ></TableCell>
                                <TableCell align="left">Invoice No- {biltyInfo.invoice_no}</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell className="invoicelasttd" align="right"></TableCell>
                                <TableCell className="invoicelasttd" align="right"></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell ></TableCell>
                                <TableCell align="left">Date - {biltyInfo.bitly_date}</TableCell>
                                <TableCell align="right"></TableCell>
                                <TableCell className="invoicelasttd" align="right">Total</TableCell>
                                <TableCell className="invoicelasttd" align="right">{biltyInfo.goods_value}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridAutoColumns: '1fr',
                    gap: 1,
                }}
            >
                <Item sx={{ gridRow: '1', gridColumn: 'span 2' }} style={{ border: 'none' }}>
                    <Box>
                        <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                            Note: No Responsibility for Leakage and Damage.
                        </Typography>
                        <FormGroup style={{ flexDirection: 'row', alignItems: 'center', marginTop: '10px' }}>
                            <InputLabel style={{ color: 'black', marginRight: '20px', fontSize: '11px' }}>Consignor&#39;s Name And Address.</InputLabel>
                            <Typography>
                                {data.consignor_name}
                            </Typography>
                        </FormGroup>
                    </Box>
                </Item>
                <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
                    <Box>
                        {/* <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                            GSTIN - {biltyInfo.gst_no}
                        </Typography> */}
                    </Box>
                </Item>

                <Item sx={{ gridRow: '1' }} style={{ border: 'none' }}>
                    <Box>
                        <Typography style={{ textAlign: 'start', fontSize: '11px' }}>
                            Signiture Of Booking Clerk
                        </Typography>
                    </Box>
                </Item>
            </Box>



        </div>
    )
})

const BiltyInvoice = (props) => {
    const componentRef = useRef();
    const { data } = props
    const router = useRouter();
    ComponentToPrint.displayName = "ComponentToPrint";
    return (

        <div style={{ width: '842px', margin: 'auto' }}>

            <style jsx>{`
        @media print {
          @page {
            size: a4 landscape;
          }
        }
      `}</style>

            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />

            <ComponentToPrint ref={componentRef} data={data} invoiceName={'Driver Copy'} />
        </div>


    );
};

export default BiltyInvoice;