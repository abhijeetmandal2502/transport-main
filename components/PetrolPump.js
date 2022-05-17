import { DoubleArrow } from "@material-ui/icons";
import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import BtnNewBooking from "./buttons/NewBooking";
import TableComponent from "./TableComponent";

const PetrolPump = () => {
    return (
        <div>
            {" "}
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
                    Manage Petrol Pumps
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
                            Petrol Pump List
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: { xs: "flex-start", sm: "flex-end" },
                            }}
                        >
                            <Link href="/loading/add-new-petrol-pump" passHref>
                                <a>
                                    <BtnNewBooking />
                                </a>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>

                <TableComponent />
            </Container>
        </div>
    );
};

export default PetrolPump;
