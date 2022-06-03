import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.dark,
}));

const VehicleAssign = () => {
  return (
    <Box marginTop={{ xs: '40%', sm: '2px', md: '5%' }}>
      <BreadCrumb pageName={'Assign Vehicle'} />
      <Item>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: '600' }}>
                Assign Vehicle To LR/CN{' '}
              </Typography>
            </Grid>

            <Grid item xs={8}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600' }}>LR Number </Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography sx={{ textAlign: 'left', color: 'black' }}>
                    dgasjdhasjh
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600' }}>Consignor</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ textAlign: 'left', color: 'black' }}>
                    dgasjdhasjh
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600', textAlign: 'left' }}>
                    Consignee
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ textAlign: 'left', color: 'black' }}>
                    dgasjdhasjh
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600' }}>From</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ textAlign: 'left', color: 'black' }}>
                    dgasjdhasjh
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600', textAlign: 'left' }}>
                    To
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ textAlign: 'left', color: 'black' }}>
                    dgasjdhasjh
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography sx={{ fontWeight: '600' }}>Price</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Item>
    </Box>
  );
};

export default VehicleAssign;
