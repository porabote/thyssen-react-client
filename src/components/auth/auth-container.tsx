import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Api from "@/services";
import {
  authCheck,
  authCheckSuccess,
  loginRequest,
  loginSuccess,
} from "./redux-store/auth-actions";
import {requestDicts} from "../dicts/redux-store/dicts-actions";
import LayoutContainer, {LoginLayout} from "@/components/layout";
import {LOGIN_API_URL} from "./constants";
import FeedPreloader from "@/components/feed/feed-preloader";

const AuthContainer = (props: {}) => {

  const dispatch = useDispatch();

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const {isAuth, dictsRequired} = useSelector((state: { auth: { isAuth: boolean, dictsRequired: [] } }) => state.auth);
  const {dicts, components} = useSelector((state: { dicts: { dicts: [], components: {auth: any} } }) => state.dicts);
  const isDictsLoaded = components.auth ? true : false;

  useEffect(() => {
    authCheck();
    dispatch(requestDicts(dictsRequired, 'auth'));
  }, []);

  const authCheck = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      dispatch(authCheckSuccess(access_token));
    }
    setIsAuthChecked(true);
  }

  if (!isAuthChecked) {
    return <FeedPreloader/>;
  }

  if (isAuth) {
    return <LayoutContainer/>;
  }

  const login: Function = (data: {}) => {

    dispatch(loginRequest());

    Api.post(LOGIN_API_URL, {
      body: data
    }).then((resp: { data: { jwtToken: any } }) => {
      const parsedData = setToken(resp.data.jwtToken);
      const {
        data,
        access_token
      } = parsedData;

      dispatch(loginSuccess(data, access_token));
    });
  }

  const setToken = (tokens: { access_token: string }) => {

    let data = {}
    let access_token = null

    if (typeof tokens.access_token !== "undefined") {
      access_token = tokens.access_token;
      data = parseJwt(tokens.access_token);
    }

    return {
      access_token,
      data,
    };
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('porabote_user', JSON.stringify(data));
  }

  const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];

    if (base64Url === undefined) return null;

    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  if (isAuthChecked) {
    return <LoginLayout isDictsLoaded={isDictsLoaded} dicts={dicts} login={login}/>;
  }


}

export default AuthContainer;
