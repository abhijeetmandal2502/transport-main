import React from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const DataNotAvl = () => {
  return (
    <Typography
      variant="h5"
      component="h5"
      sx={{ fontWeight: 'bold' }}
      style={{
        color: 'red',
        padding: 'auto',
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 50,
        fontWeight: 'bolder',
      }}
    >
      There is no data available..
    </Typography>
  );
};

export default DataNotAvl;
