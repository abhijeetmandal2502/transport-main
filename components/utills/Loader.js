import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
  circularProgressClasses,
} from '@mui/material/CircularProgress';

const Loader = (props) => {
  return (
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) => (theme.palette.mode === 'light' ? 'blue' : 'yellow'),
        animationDuration: '550ms',
        // position: 'absolute',
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: 'round',
        },
      }}
      size={30}
      thickness={5}
      {...props}
    />
  );
};

export default Loader;
