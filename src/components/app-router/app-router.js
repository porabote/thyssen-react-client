import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from 'porabote/protected-route/'
import { AuthForm } from '@components/auth'
import SampleComponent from '../sample-component'
import Equipments from '../equipments'
import Spares from '../spares'
import Reports from '../reports'
import Observers from '@components/observers'
import BusinessEvents from '@components/business-events'
import PaymentsSets from '../payments-sets'
import MainPage from '../main-page'
import Store from '../../store'

const AppRouter = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                <ProtectedRoute path="/sample-component/:action" component={SampleComponent} />
                <ProtectedRoute path="/equipments/:action" component={Equipments} />
                <ProtectedRoute path="/spares/:action" component={Spares} />
                <ProtectedRoute path="/reports/:action" component={Reports} />
                <ProtectedRoute path="/observers/:action" component={Observers} />
                <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSets} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={AuthForm}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;