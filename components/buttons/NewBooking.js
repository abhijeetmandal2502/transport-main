import { Add } from "@material-ui/icons";
import { Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const BtnNewBooking = (props) => {
  const { url, name } = props;
  const router = useRouter();
  return (
    <div>
      <Link href={url}>
        <Button
          className="newbookingbtn"
          variant="outlined"
          style={{ marginRight: 10, background: "green", color: "white" }}
        >
          <Add style={{ fontSize: "20px" }} />
          {name}
        </Button>
      </Link>
    </div>
  );
};

export default BtnNewBooking;
