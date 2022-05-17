import React from "react";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex" }}>
        <Typography style={{ marginRight: 10 }}> <Link href="/">Home</Link></Typography>
        <Typography onClick={handleClick} style={{ marginRight: 10 }}>
          <Link href="#" >Booking</Link>
        </Typography>
        <Typography onClick={handleClick} style={{ marginRight: 10 }}>
          <Link href="#" >Account</Link>
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      // style={{ marginTop: 40 }}
      >
        <MenuItem>
          <Link href="/booking/LRbooking"> LR/CN Booking</Link>
        </MenuItem>
        <MenuItem>Vehicle Assignment</MenuItem>
      </Menu>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
      // style={{ marginTop: 40 }}
      >
        <MenuItem>
          <Link href="/booking/LRbooking"> Account Booking</Link>
        </MenuItem>
        <MenuItem>Account Assignment</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
