import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import React from 'react';

const Error = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 500,
        // backgroundColor: '#737373',
      }}
    >
      <Box>
        <Typography
          id="suraj3d"
          variant="h1"
          style={{
            textAlign: 'center',
            color: '#70869d',
            letterSpacing: '.15em',
          }}
        >
          {' '}
          404
        </Typography>
        <Box className="cloak__wrapper" style={{}}>
          <Box className="cloak__container">
            <Box className="cloak"></Box>
          </Box>
        </Box>
        <Box className="info" style={{}}>
          {' '}
          <Typography variant="h4"> We can not find that page</Typography>
          <Typography variant="p">
            {' '}
            We are fairly sure that page used to be here, but seems to have gone
            missing. We do apologise on it is behalf.
          </Typography>
          <br></br>
          <Button
            href="/"
            style={{
              marginTop: 10,
              border: '1px solid #098a8f',
              paddingLeft: 20,
              paddingRight: 20,
              color: 'white',
              background: '#1c4e80',
            }}
          >
            Back To Home
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Error;
