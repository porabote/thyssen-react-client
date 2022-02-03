import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { AuthForm } from "@components/auth";
import SampleComponent from "../sample-component";
import Equipments from "../equipments";
import Spares from "../spares";
import Reports from "../reports";
import Observers from "@components/observers";
import BusinessEvents from "@components/business-events";
import Platforms from "@components/platforms";
import Users from "@components/users";
import PaymentsSets from "../payments-sets";
import MainPage from "../main-page";
import Store from "../../store";
import Chat from "@components/chat";

const AppRouter = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                <ProtectedRoute path="/chat/:action" component={Chat} />
                <ProtectedRoute path="/sample-component/:action" component={SampleComponent} />
                <ProtectedRoute path="/equipments/:action" component={Equipments} />
                <ProtectedRoute path="/spares/:action" component={Spares} />
                <ProtectedRoute path="/reports/:action" component={Reports} />
                <ProtectedRoute path="/observers/:action" component={Observers} />
                <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
                <ProtectedRoute path="/platforms/:action" component={Platforms} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSets} />
                <ProtectedRoute path="/users/:action" component={Users} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={AuthForm}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;