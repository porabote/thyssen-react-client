import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import ProtectedRoute from './protected-route.js'
import { FeedPage, LoginPage } from '../../pages'
import Docs from '../../docs'
import Dicts from '../../dicts'
import Chat from '../../chat'
import Reports from '../../reports'
import ToDo from '../../todo'
import Contractors from '../../contractors'
import PaymentsSet from '../../payments-set'
import Persons from '../../persons'
import Users from '../../users'

const AppRouter = props => {

    return (
        <div>
            <Switch>
                <Route path="/auth" component={LoginPage}></Route>
                <ProtectedRoute path="/chat" exact component={Chat} />
                <ProtectedRoute path="/toDo" exact component={ToDo} />
                <ProtectedRoute path="/feed" component={FeedPage} />
                <ProtectedRoute path="/payments-set/:action" component={PaymentsSet} />
                <ProtectedRoute path="/docs/:action" exact component={Docs} />
                <ProtectedRoute path="/dictionaries/:action" exact component={Dicts} />
                <ProtectedRoute path="/contractors/:action" exact component={Contractors} />
                <ProtectedRoute path="/contractors/:action" exact component={Persons} />
                <ProtectedRoute path="/users/:action" exact component={Users} />
                <ProtectedRoute path="/reports/:action" component={Reports} />
                <Redirect to="/payments-set/feed/" />
            </Switch>
        </div>
    );
};

export default AppRouter;