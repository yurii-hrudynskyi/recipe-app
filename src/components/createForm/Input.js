import React from "react";
import TextField from "@material-ui/core/TextField";

export const Input = (props) => {
  return <TextField variant="outlined" margin="normal" fullWidth {...props} />;
};
