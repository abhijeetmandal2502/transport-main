import {
    Autocomplete,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Modal,
    OutlinedInput,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { typography } from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
    {
        field: 'id',
        headerName: 'ID',
        width: 60,
    },
    {
        field: 'lr_no',
        headerName: 'LR No.',
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
        field: 'shipment_no',
        headerName: 'Shipment No',
        width: 150,
        editable: true,
    },
    {
        field: 'from_location',
        headerName: 'From',
        width: 110,
        editable: true,
    },
    {
        field: 'to_location',
        headerName: 'To',
        width: 110,
        editable: true,
    },
    {
        field: 'vehicle_no',
        headerName: 'Vehicle',
        width: 160,
        editable: true,
    },
    {
        field: 'weight',
        headerName: 'Weight',
        width: 110,
        editable: true,
    },
    {
        field: 'total_amount',
        headerName: 'Total Amount',
        width: 110,
        editable: true,
    },

];


const BillDetailsModel = (props) => {

    const { open, setOpen, handleClose, bilties, consignorData } = props
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState('lg');

    const rows = [];
    bilties.map((b, i) => {
        rows.push({ id: i + 1, lr_no: b.lr_no, consignee: b.consignee, shipment_no: b.shipment_no, from_location: b.from_location, to_location: b.to_location, vehicle_no: b.vehicle_no.toUpperCase(), weight: parseFloat(b.weight) + ' Kg', total_amount: b.total_amount })
    });

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={fullWidth}
            maxWidth={maxWidth}

        >
            <DialogTitle id="alert-dialog-title">
                {consignorData.consignor}
            </DialogTitle>
            <DialogContent style={{ height: 500, width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                />
                <div style={{ justifyContent: 'space-evenly', display: 'flex' }}>
                    <Typography>Total Weight : {consignorData.total_weight}</Typography>
                    <Typography>Total Price : {consignorData.total_amount}</Typography>

                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BillDetailsModel;
