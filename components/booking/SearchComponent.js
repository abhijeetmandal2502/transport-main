import { Search } from '@material-ui/icons';
import { Button, FormControl, Input, InputAdornment, InputLabel } from '@mui/material';
import React from 'react';
import { useState } from 'react';

const SearchComponent = (props) => {
    const { text, searchString, searchCN } = props;
    const [cn, setCn] = useState('')

    const searchLR = () => {

        searchCN({ key: cn, type: "cn-search" })
    }

    return (
        <FormControl variant="standard" sx={{ dispaly: "flex" }} className="suraj" style={{
            flexDirection: "row", alignItems: "flex-end"

        }}>
            <InputLabel htmlFor="input-with-icon-adornment">
                {text}
            </InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                }

                onChange={(e) => { searchString(e.target.value), setCn(e.target.value) }}
            />
            <Button
                className="newbookingbtn"
                variant="outlined"
                style={{ marginRight: 10, background: "#17a2b8", color: "white",height:38 ,       width: "30%" }}
                sx={{ display: 'inline' }}
                onClick={() => searchLR()}
            >
                Search
            </Button>
        </FormControl>
    );
};

export default SearchComponent;
