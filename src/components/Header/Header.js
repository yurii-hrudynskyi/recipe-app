import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { NavMenu } from "./NavMenu";

export const Header = () => {
  const [menuIsOpen, SetMenuIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <AppBar position="static" style={{ marginBottom: "20px" }}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon
              onClick={(event) => {
                SetMenuIsOpen((prevOpen) => !prevOpen);
                setAnchorEl(event.target);
              }}
            />
          </IconButton>
          <NavMenu
            menuIsOpen={menuIsOpen}
            SetMenuIsOpen={SetMenuIsOpen}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />
          <Typography variant="h7">Reyna De Waffles</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};
