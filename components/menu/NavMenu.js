import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { Box } from '@material-ui/core';
import {
  ArrowDownward,
  ArrowDropDown,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MenuBookTwoTone,
  MenuTwoTone,
} from '@material-ui/icons';
import { signOut } from 'next-auth/react';
import { textAlign } from '@mui/system';

const NavMenu = ({ props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Box sx={{ display: { xs: 'none', sm: 'block', md: 'block' } }}>
        {
          <Button
            style={{
              color: 'white',
              textTransform: 'capitalize',
              fontWeight: '600',
              fontSize: '16px',
            }}
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {props.title}
            {Object.keys(props.items).length > 0 && anchorEl === null ? (
              <KeyboardArrowDown />
            ) : (
              <KeyboardArrowUp />
            )}
          </Button>
          // </Link>
        }
        {props.items && (
          <Menu
            style={{
              marginTop: 25,
              alignContent: 'center',
              textAlign: 'center',
              justifyItems: 'center',
            }}
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            {props.items.map((items, key) => {
              return (
                <Link href={items.slug} key={key}>
                  <MenuItem onClick={handleClose}>{items.name}</MenuItem>
                </Link>
              );
            })}
          </Menu>
        )}
      </Box>

      {/* comment */}
    </div>
  );
};

export default NavMenu;
