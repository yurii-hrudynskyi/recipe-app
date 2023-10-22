import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";

export const NavMenu = ({ menuIsOpen, SetMenuIsOpen }) => {
  return (
    <>
      <Drawer
        anchor={"left"}
        open={menuIsOpen}
        onClick={() => {
          SetMenuIsOpen((prev) => !prev);
        }}
      >
        <List>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "#616161"
            }}
            activeStyle={{
              color: "#3f51b5"
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Main"} />
            </ListItem>
          </NavLink>

          <NavLink
            to="/create"
            style={{
              textDecoration: "none",
              color: "#616161"
            }}
            activeStyle={{
              color: "#3f51b5"
            }}
          >
            <ListItem button>
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary={"Create"} />
            </ListItem>
          </NavLink>
        </List>
      </Drawer>

      {/* <Menu
        open={menuIsOpen}
        anchorEl={anchorEl}
        onClick={() => SetMenuIsOpen(false)}
      >
        <MenuItem>
          <Link to="/create">Create a Recipe</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/">Main</Link>
        </MenuItem>
      </Menu> */}
    </>
  );
};
