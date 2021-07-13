import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from '@porabote/protected-route/'
import { Auth } from '@porabote/auth'
import PaymentsSets from '../payments-sets'
import MainPage from '../main-page'

const AppRouter = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSets} />
                <Route path="/auth/:action" exact component={Auth}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;