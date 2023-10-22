import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { FacebookIcon, InstagramIcon, TelegramIcon } from "./SvgIcons";
import { Link } from "react-router-dom";

export const Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      style={{
        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
        backgroundColor: "#3f51b5"
      }}
      showLabel={false}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Facebook"
        value="facebook"
        icon={
          <Link to="/facebook">
            <FacebookIcon />
          </Link>
        }
      />

      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Instagram"
        value="instagram"
        icon={
          <Link to="/instagram">
            <InstagramIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        style={{ color: "#fff" }}
        label="Telegram"
        value="telegram"
        icon={
          <Link to="/telegram">
            <TelegramIcon />
          </Link>
        }
      />
    </BottomNavigation>
  );
};
