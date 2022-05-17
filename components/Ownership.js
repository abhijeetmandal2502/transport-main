import React from 'react';
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

const Ownership = (props) => {
    const { showOwner } = props

    return (
        showOwner ?
            // <Grid item xs={12} sm={6} style={{}}>
            <Paper
                sx={{ width: "100%", overflow: "hidden" }}
                style={{ paddingBottom: 16, paddingTop: 16, }}
                elevation={4}
            >
                <Typography variant="h6" style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16, }}>
                    Owner/Broker Information
                </Typography>
                <Divider />
                <Box style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, }}>
                    <Box
                        style={{
                            marginBottom: 8,
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "baseline",
                        }}
                    >
                        {" "}
                        <Typography>Name</Typography>
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
                                placeholder="Enter Name"
                                style={{
                                    width: "-webkit-fill-available",
                                    paddingLeft: 5,
                                    height: 36,
                                    borderRadius: "4px  ",
                                }}
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
                        <Typography>Address</Typography>
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

                            <TextareaAutosize
                                placeholder="Enter Address"
                                style={{
                                    width: "-webkit-fill-available",
                                    paddingLeft: 5,
                                    height: 50,
                                    borderRadius: "4px  ",
                                }}
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
                        <Typography>Contact No</Typography>
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
                                placeholder="Enter Mobile No."
                                style={{
                                    width: "-webkit-fill-available",
                                    paddingLeft: 5,
                                    height: 30,
                                    borderRadius: "4px 0px 0px 4px",
                                }}
                            />

                            <OutlinedInput
                                placeholder="Enter Alternative No."
                                style={{
                                    width: "-webkit-fill-available",
                                    paddingLeft: 5,
                                    height: 30,
                                    borderRadius: "0px 4px 4px 0px",
                                }}
                            />
                        </Box>
                    </Box>
                    {/* <Box
                                    style={{
                                        marginBottom: 8,
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "baseline",
                                    }}
                                >
                                    {" "}
                                    <Typography>Code</Typography>
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
                                            placeholder="Enter Owner/Broker Code"
                                            style={{
                                                width: "-webkit-fill-available",
                                                paddingLeft: 5,
                                                height: 36,
                                                borderRadius: "4px  ",
                                            }}
                                        />

                                    </Box>
                                </Box> */}
                </Box>
            </Paper>
            // </Grid> 
            : null
    );
};

export default Ownership;
