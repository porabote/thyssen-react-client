import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from '@porabote/protected-route/'
import { Auth } from '@porabote/auth'
import PaymentsSets from '../payments-sets'
import Reports from '../reports'
import MainPage from '../main-page'
import Store from '../store'

const AppRouter = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSets} />
                <ProtectedRoute path="/reports/:action" component={Reports} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={Auth}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;