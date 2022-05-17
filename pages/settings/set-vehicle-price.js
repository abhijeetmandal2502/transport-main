import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import PriceForVehicle from '../../components/settings/PriceForVehicle';

const SetVehiclePrice = () => {
  return (
    <div>
      <BreadCrumb />
      <Box>
        <Grid container style={{ marginBottom: 15 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
              Set Vehicle Prices
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
              }}
            >
              {/* <BackButton
                url={'/settings/vehicle-category'}
                name={'Add New Location'}
              /> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <PriceForVehicle />
    </div>
  );
};

export default SetVehiclePrice;
