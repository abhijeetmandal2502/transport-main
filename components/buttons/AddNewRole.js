import { Add } from '@material-ui/icons';
import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';

const AddNewRole = () => {
  return (
    <div>
      <Button
        className="newbookingbtn"
        variant="outlined"
        style={{ background: 'green', color: 'white' }}
      >
        <Add style={{ fontSize: '20px' }} />
        Add New Role
      </Button>
    </div>
  );
};

export default AddNewRole;
