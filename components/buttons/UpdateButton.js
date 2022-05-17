import { Add } from "@material-ui/icons";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import EditIcon from '@mui/icons-material/Edit';
import React from "react";

const UpdateButton = (props) => {
    const { url, name } = props;
    const router = useRouter();
    return (
        <div>
            <Link href={url}>
                <Button variant="contained" size="small" startIcon={<EditIcon />} color="secondary" >
                    Edit
                </Button>
            </Link>
        </div>
    );
};

export default UpdateButton;
