import { Button } from '@material-ui/core';
import { ArrowBackTwoTone } from '@material-ui/icons';
import Link from 'next/link';
import React from 'react';

const BackButton = (props) => {
  const { url } = props;
  return (
    <div>
      <Link href={url}>
        <Button
          className="newbookingbtn"
          variant="outlined"
          style={{ background: '#17a2b8', color: 'white' }}
        >
          <ArrowBackTwoTone style={{ fontSize: '20px' }} /> Back
        </Button>
      </Link>
    </div>
  );
};

export default BackButton;
