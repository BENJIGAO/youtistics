import React from "react";
import { getToken } from "common/utils/authUtils";

const AuthButton = () => {
  return <button onClick={getToken}>Get Started</button>;
};

export default AuthButton;
