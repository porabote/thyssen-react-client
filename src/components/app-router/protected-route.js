import React from 'react';
import { connect, useSelector } from 'react-redux';
import {Redirect, Route} from 'react-router-dom';

export const ProtectedRoute = ({component: Component, ...rest}) => {

  const auth = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuth) {
          return <Component {...props} />;
        } else {
          return <Redirect to={
            {
              pathname: "/auth/login",
              state: {
                from: props.location
              }
            }
          }/>
        }

      }
      }/>
  );

};

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
  })
}

export default ProtectedRoute;