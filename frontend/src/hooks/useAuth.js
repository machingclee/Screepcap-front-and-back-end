import React, { useEffect, useContext } from "react";
import AuthContext from "../contexts/authContext";

export default () => {
  const { userIsStored, setUserIsStored } = useContext(AuthContext);
  return { userIsStored, setUserIsStored };
};
