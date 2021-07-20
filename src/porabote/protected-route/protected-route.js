import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { AuthConsumer } from '@porabote/auth'

export const ProtectedRoute = ({component: Component, ...rest}) => {

    return (

        <AuthConsumer>
            {
                authState => {

                    return (
                        <Route
                            {...rest}
                            render={props => {

                                if (authState.state.isAuth) {
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
                            }/>)

                }
            }
        </AuthConsumer>

    );
};

export default ProtectedRoute;