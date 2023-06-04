import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store";
import AuthContainer from "@components/auth";
import AppContext, {appInitValues} from "./AppContext";

const App = () => {

  return (
    <Provider store={store}>
        <BrowserRouter basename="/porabote">
          <AuthContainer/>
        </BrowserRouter>
    </Provider>
  );
};

export default App;
