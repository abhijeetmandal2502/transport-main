import { Container } from '@mui/material';
import React from 'react';
import BreadCrumb from '../../components/BreadCrumb';
import NewPetrolPump from '../../components/loading/NewPetrolPump';
const addNewPetrolPump = () => {
  return (
    <div>
      <BreadCrumb />
      <NewPetrolPump />
    </div>
  );
};

export default addNewPetrolPump;
