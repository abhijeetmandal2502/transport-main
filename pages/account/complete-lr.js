import { Box, Container, Grid, Typography } from "@material-ui/core";
import BreadCrumb from "../../components/BreadCrumb"
import TableComponent from "../../components/TableComponent"

const CompleteLr = () => {
    const column = [];
    const rows = [];
    return (
        <>
            <BreadCrumb />
            <Container
                style={{
                    alignItems: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <Grid container style={{ marginBottom: 15 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 'bold' }}>
                            Available LR for Close Status
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                            }}
                        ></Box>
                    </Grid>
                </Grid>

                <TableComponent column={column} rows={rows} />
            </Container>

        </>
    )
}

export default CompleteLr