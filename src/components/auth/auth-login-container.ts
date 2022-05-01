import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Api from "@services";
import { requestDicts } from "../dicts/store/dicts-actions";
import AuthLogin from "./auth-login";

const AuthLoginContainer = () => {

  const dispatch = useDispatch();

  const { dictsRequired } = useSelector(state => state.auth);
  const { dicts, components } = useSelector(state => state.dicts);

  const isDictsLoaded = components.auth ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'auth'));
  }, []);

  const login: Function = (data) => {
    console.log(data)
    Api.post("/api/users/method/login", {
      body: data
    }).then(resp => {
      console.log(resp);
    });
  }

  return React.createElement(AuthLogin, {
    isDictsLoaded,
    dicts,
    login,
  });

}

export default AuthLoginContainer;