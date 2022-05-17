import { Container } from "@mui/material"
import BreadCrumb from "../../../components/BreadCrumb"
import FreshLR from "../../../components/edit/FreshLR";
import LoadingLR from "../../../components/edit/LoadingLR";
import VehicleAssigned from "../../../components/edit/VehicleAssigned";
import { getSession } from "next-auth/react";
import { useState } from "react";

const EditLR = ({ data, lrId }) => {

    const [status, setStatus] = useState(data.status)

    let comp
    if (status === 'fresh') {
        comp = <FreshLR lrno={lrId} />
    }
    else if (status === 'loading') {
        comp = <LoadingLR lrno={lrId} />
    }
    else if (status === 'vehicle-assigned') {
        comp = <VehicleAssigned lrno={lrId} />
    }

    return (
        <>
            <Container
                style={{
                    alignItems: 'center',
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <BreadCrumb />
            </Container>
            {
                comp
            }

        </>
    )
}

export default EditLR;

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);

    // get lr number from params 
    const lrId = ctx.query.id;

    var data = []
    if (session !== null && session !== undefined) {
        const token = session.user.access_token;
        // Fetch data from external API
        try {
            const req = await fetch(`${process.env.apiUrl}/lr-status/${lrId}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            const res = await req.json();
            if (res.status === 'success') {
                data = res.data;
            } else {
                data = [];
            }
        } catch (error) {

        }


    } else {
        data = '';
    }

    return { props: { data, lrId } };

    // Pass data to the page via props
}
