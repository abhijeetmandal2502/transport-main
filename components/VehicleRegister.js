import {
    Autocomplete,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextareaAutosize,
    TextField,
    Typography,
} from "@mui/material";
import Modal from '@mui/material/Modal';
import { makeStyles } from "@material-ui/core/styles";
import { state } from "./Utils"

import {
    Add,
    ArrowBackRounded,
    DoubleArrow,
    ShoppingBasket,
    ShoppingCart,
    Visibility,
    Search,
} from "@material-ui/icons";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Ownership from "./Ownership";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));

const VehicleRegister = (props) => {
    const { setFormData, formData } = props
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const vehileOwnership = [
        { label: "Owned" },
        { label: "Third-party" },
    ];


    const vehicleOwner = (data) => {
        const info = data.toLowerCase();
        if (info === 'third-party') {
            props.setShowOwner(true);
        }
        else {
            props.setShowOwner(false)
        }
    }

    return (
        <div style={{}}>
            <Container
                style={{
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginTop: 5,
                    marginBottom: 5,
                }}
            >
                <Paper
                    sx={{ width: "100%", overflow: "hidden" }}
                    style={{ paddingBottom: 16, paddingTop: 16, }}
                    elevation={4}
                >
                    <Typography variant="h6" style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16, }}>
                        Vehicle Information
                    </Typography>
                    <Divider />
                    <Box style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16, }}>

                        <Box
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                            }}
                        >
                            {" "}
                            <Typography>Vehicle Ownership</Typography>
                            <Box
                                style={{
                                    width: "60%",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                }}
                            >
                                <Autocomplete
                                    style={{ width: "100%" }}
                                    disablePortal
                                    className="autocomp1"
                                    id="combo-box-demo"
                                    options={vehileOwnership}

                                    // defaultValue="--Select--"
                                    renderInput={(params) => <TextField {...params} placeholder="Select you option" />}
                                    onChange={(event, value) => {


                                        if (value != null) {
                                            vehicleOwner(value.label)

                                        }
                                        else {
                                            vehicleOwner(value.label)
                                            props.setShowOwner(false)
                                        }
                                        setFormData({ ...formData, ownership: value.label.toLowerCase() })

                                    }}
                                    required

                                />

                            </Box>
                        </Box>
                        <Box
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                            }}
                        >
                            {" "}
                            <Typography>Vehicle No</Typography>
                            <Box
                                style={{
                                    width: "60%",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                }}
                            >
                                {" "}

                                <OutlinedInput
                                    placeholder="Enter Vehicle No"
                                    style={{
                                        width: "-webkit-fill-available",
                                        paddingLeft: 5,
                                        height: 36,
                                        borderRadius: "4px ",
                                    }}
                                    required
                                    onChange={(e) => setFormData({ ...formData, vehicle_no: e.target.value })}
                                />

                            </Box>
                        </Box>
                        <Box
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                            }}
                        >
                            {" "}
                            <Typography>State</Typography>
                            <Box
                                style={{
                                    width: "60%",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                }}
                            >
                                <Autocomplete
                                    style={{ width: "100%" }}
                                    disablePortal
                                    className="autocomp1"
                                    id="combo-box-demo"
                                    options={state}
                                    // defaultValue="--Select--"
                                    renderInput={(params) => <TextField {...params} placeholder="--Select--" />}
                                    onChange={(event, value) => setFormData({ ...formData, state: value.label })}
                                    required
                                />

                            </Box>
                        </Box>
                        <Box
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                            }}
                        >
                            {" "}
                            <Typography>Vehicle Details</Typography>
                            <Box
                                style={{
                                    width: "60%",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                }}
                                onChange={(e) => setFormData({ ...formData, vehicle_details: e.target.value })}
                            >
                                {" "}

                                <OutlinedInput
                                    placeholder="Enter Detail"
                                    style={{
                                        width: "-webkit-fill-available",
                                        paddingLeft: 5,
                                        height: 36,
                                        borderRadius: "4px",
                                    }}
                                    required
                                />

                            </Box>
                        </Box>
                        <Box
                            style={{
                                marginBottom: 8,
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "baseline",
                            }}
                        >
                            {" "}
                            <Typography>Vehicle Type</Typography>
                            <Box
                                style={{
                                    width: "60%",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: 5,
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                }}
                            >
                                <Autocomplete
                                    style={{ width: "100%" }}
                                    disablePortal
                                    className="autocomp1"
                                    id="combo-box-demo"
                                    options={vehileOwnership}
                                    // defaultValue="--Select--"
                                    renderInput={(params) => <TextField {...params} placeholder="--Select--" />}
                                    onChange={(event, value) => setFormData({ ...formData, type: value.label })}

                                    required
                                />

                            </Box>
                        </Box>
                    </Box>
                    <Divider />
                    <Box style={{ paddingTop: 16, }}
                        sx={{ display: "flex", justifyContent: "center" }}

                    >
                        <Button
                            className="newbookingbtn"
                            variant="outlined"
                            style={{ marginRight: 10, background: "green", color: "white" }}
                        >
                            <Add style={{ fontSize: "20px" }} />{" "}
                            Save Vehicle Registration
                        </Button>

                    </Box>
                </Paper>



            </Container>

        </div>
    );
};

export default VehicleRegister;
