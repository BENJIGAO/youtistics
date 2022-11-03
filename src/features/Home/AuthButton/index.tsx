import React from "react";
import { getToken } from "common/utils/authUtils";
import { Button } from "@mui/material";

const AuthButton = () => {
  return (
    <Button variant="contained" onClick={getToken}>
      Get Started
    </Button>
  );
};

export default AuthButton;
