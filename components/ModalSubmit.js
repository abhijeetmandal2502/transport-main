import {
    Autocomplete,
    Box,
    Button,
    Container,
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
import { useState } from "react";

const ModalSubmit = (props) => {

    const { confirmationData, showModel, setShowModel, apiCall } = props
    const handleClose = () => {
        setShowModel(false)
    }
    const clickConfirm = () => {
        apiCall()
    }


    return (
        <Modal
            open={showModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                width: { xs: '80%', sm: '60%' },
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
            }}>
                <Typography sx={{ p: '10px' }} id="modal-modal-title" variant="h6" component="h2">
                    New Consignor.
                </Typography>
                <Divider />
                <Box sx={{ p: '10px' }}>
                    <Grid container sx={{ height: { xs: '350px', sm: 'auto' }, overflowY: { xs: 'scroll', sm: 'unset' } }} >
                        <Grid item xs={12}  >
                            {confirmationData.map((data, key) => {

                                return (
                                    <Box
                                        style={{
                                            marginBottom: 8,
                                            justifyContent: "space-between",
                                            alignItems: "baseline",
                                        }}
                                        sx={{ display: { xs: 'block', sm: 'flex' } }}
                                        key={key}
                                    >
                                        {/* displaying dta through maping */}


                                        <Typography sx={{ fontWeight: 'bold', fontWeight: 900 }}>{data.fieldName}</Typography>
                                        <Box
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                borderRadius: 5,
                                                justifyContent: "space-between",
                                            }}
                                            sx={{ width: { xs: '100%', sm: '60%' } }}
                                        >
                                            <Typography>{data.data}</Typography>
                                        </Box>
                                    </Box>
                                )
                            })}


                        </Grid>
                    </Grid>
                </Box>
                <Box style={{ display: 'flex', justifyContent: 'flex-end', }}>
                    <Box sx={{ p: '10px', textAlign: 'end' }}>
                        <Button variant="outlined"
                            style={{
                                color: "white", borderColor: '17a2b8', background: '#800000'
                            }}
                            onClick={handleClose}

                        >clsoe</Button>
                    </Box>
                    <Box sx={{ p: '10px', textAlign: 'end' }}>
                        <Button variant="outlined"
                            type="submit"
                            style={{
                                color: "white", borderColor: '17a2b8', background: '#17a2b8'
                            }}
                            onClick={() => clickConfirm()}
                        >Submit</Button>
                    </Box>
                </Box>
            </Box>

        </Modal>
    );
};

export default ModalSubmit;
