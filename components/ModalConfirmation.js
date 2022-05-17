import {
  Autocomplete,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  OutlinedInput,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { typography } from "@mui/system";

const ModalConfirmation = (props) => {

  const { confirmationData, open, setOpen, submitMethod, title } = props
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}

        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <Grid container spacing={2}>

              {
                confirmationData.map((item, key) => <Fragment key={key} >
                  <Grid item xs={4}>

                    <Typography style={{ fontWeight: 700, color: 'black' }}>
                      {item.fieldName}
                    </Typography>

                  </Grid>

                  <Grid item xs={1}>

                    <Typography style={{ fontWeight: 700, color: 'black' }}>
                      :
                    </Typography>

                  </Grid>
                  <Grid item xs={7}>

                    <Typography style={{ fontWeight: 500, color: 'black' }}>
                      {item.data}
                    </Typography>

                  </Grid>
                </Fragment>)
              }

            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus variant="contained" color="error" onClick={handleClose}  >
            close
          </Button>
          <Button onClick={submitMethod} variant="contained" color="success" autoFocus >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default ModalConfirmation;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

// chanegs done with empty

