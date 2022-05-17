import React from 'react';
import {
    Typography,
    Grid,
} from "@mui/material";
import { Box, Button, Container } from "@mui/material";
import {
    DoubleArrow,
} from "@material-ui/icons";
import Link from "next/link";
import TableComponent from '../TableComponent';
import BtnNewBooking from '../buttons/NewBooking';

const MappingLocationcmpnt = () => {
    return (
        <>
            <Container
                style={{
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginTop: 5,
                    marginBottom: 5,
                }}
            >
                <Typography variant="p" component="p">
                    Home
                    <DoubleArrow
                        style={{
                            fontSize: "12px",
                            color: "gray",
                            marginLeft: 2,
                            marginRight: 2,
                        }}
                    />
                    Location Mapping
                </Typography>
            </Container>

            <Container
                style={{
                    alignItems: "center",
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <Grid container style={{ marginBottom: 15 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
                            List of Location Mapping
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{ display: "flex", justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}

                        >

                            <BtnNewBooking url={"/settings/new-location-mapping"} name={"Map New Location"} />

                        </Box>
                    </Grid>
                </Grid>

                {/* <TableComponent /> */}
            </Container>
        </>
    );
};

export default MappingLocationcmpnt;
