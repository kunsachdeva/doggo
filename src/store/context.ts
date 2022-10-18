import React, { createContext } from "react";

const dispatch: React.Dispatch<any> = () => {};
const StateContext = createContext([{}, dispatch]);

export default StateContext;
