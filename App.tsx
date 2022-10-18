/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useReducer } from "react";
 import Home from "./src/screens/Home";
 import StateContext from "./src/store/context";
 import reducer from "./src/store/reducer";
 
 const App = () => {
  const [state, dispatch] = useReducer(reducer, { });

   return (
     <StateContext.Provider value={[state, dispatch]}>
       <Home />
     </StateContext.Provider>
   );
 };
 
 export default App;
 