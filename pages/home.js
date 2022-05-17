import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";

const home = () => {
  const tablestyle = {
    border: "1px solid black",

    borderCollapse: "collapse",
  };
  const paperStyle = {
    padding: 20,
    paddingBottom: 40,
    height: "auto",
    margin: "20px auto",
    borderRadius: 6,
    border: "1px solid lightgray",
  };
  return (
    <div style={{ width: "100%" }}>
      <Container
        maxWidth="md"
        // sx={{ display: inline }}
        style={{
          height: 40,
          alignItems: "center",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Typography variant="p" component="p">
          Home
        </Typography>
      </Container>
      <Container
        sx={{ display: "flex" }}
        maxWidth="md"
        style={{
          justifyContent: "space-between",
          display: "flex",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Box>
          {" "}
          <Typography variant="h5" component="h5">
            Booking List
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          {" "}
          <Button variant="outlined">Remove a row</Button>
          <Button variant="outlined">Add a row</Button>
        </Box>
      </Container>

    </div>
  );
};

export default home;
