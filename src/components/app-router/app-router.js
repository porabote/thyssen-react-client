import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import { AuthLoginContainer } from "@components/auth";
import WorkflowContainer from "@components/workflow"
import SampleComponent from "../sample-component";
import EquipmentsContainer from "../equipments";
import Persons from "@components/persons"
import SparesContainer from "../spares";
import ReportsContainer from "../reports";
import Observers from "@components/observers";
import BusinessEvents from "@components/business-events";
import Platforms from "@components/platforms";
import UsersContainer from "@components/users";
import PaymentsSetsContainer from "../payments-sets";
import MainPage from "../main-page";
import Store from "../../store";
// import Chat from "@components/chat";

const AppRouter = () => {

    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={MainPage} />
                {/*<ProtectedRoute path="/chat/:action" component={Chat} />*/}
                <ProtectedRoute path="/sample-component/:action" component={SampleComponent} />
                <ProtectedRoute path="/equipments/:action" component={EquipmentsContainer} />
                <ProtectedRoute path="/persons/:action" component={Persons} />
                <ProtectedRoute path="/spares/:action" component={SparesContainer} />
                <ProtectedRoute path="/reports/:action" component={ReportsContainer} />
                <ProtectedRoute path="/observers/:action" component={Observers} />
                <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
                <ProtectedRoute path="/platforms/:action" component={Platforms} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSetsContainer} />
                <ProtectedRoute path="/users/:action/:id?" component={UsersContainer} />
                <ProtectedRoute path="/workflow/:action?/:id?" component={WorkflowContainer} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={AuthLoginContainer}></Route>
            </Switch>
        </div>
    );
};

export default AppRouter;