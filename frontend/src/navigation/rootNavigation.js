import React from "react";

export const navigationRef = React.createRef();

const navigate = (name, params) => navigationRef.current?.navigate(name, params);

export const navigation = {
  navigate
};
