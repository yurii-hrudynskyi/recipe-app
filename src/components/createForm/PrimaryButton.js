import React from "react";
import { Button } from "@material-ui/core";

export const PrimaryButton = ({ children, props }) => {
  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};
