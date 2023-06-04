import React from "react";
import {Route, Switch} from "react-router-dom";
import AuthContainer from "@components/auth";
import AcceptLists from "@components/accept-lists";
import AccessLists from "@components/access-lists";
import BusinessEvents from "@components/business-events";
import Companies from "@components/companies";
import Contractors from "@components/contractors";
import EquipmentsContainer from "@components/equipments";
import HomePage from "@components/pages";
import MailsPatterns from "@components/mails-patterns";
import MenuContainer from "@components/menus";
import Observers from "@components/observers";
import Payments from "@components/payments";
import PaymentsSetsContainer from "@components/payments-sets";
import Persons from "@components/persons";
import ProtectedRoute from "./protected-route";
import Platforms from "@components/platforms";
import PurchaseRequests from "@components/purchase-requests"
import ReportsContainer from "@components/reports";
import SparesContainer from "@components/spares";
import Shifts from "@components/shifts"
import Store from "../store";
import Tickets from "@components/tickets";
import UsersContainer from "@components/users";
import WorkflowContainer from "@components/workflow"

const Router = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={HomePage} />
                {/*<ProtectedRoute path="/chat/:action" component={Chat} />*/}
                <ProtectedRoute path="/accept-lists/:action?/:id?" component={AcceptLists} />
                <ProtectedRoute path="/access-lists/:action?/:id?" component={AccessLists} />
                <ProtectedRoute path="/companies/:action?/:id?" component={Companies} />
                <ProtectedRoute path="/contractors/:action?/:id?" component={Contractors} />
                <ProtectedRoute path="/menus/:action?/:id?" component={MenuContainer} />
                <ProtectedRoute path="/equipments/:action" component={EquipmentsContainer} />
                <ProtectedRoute path="/mails-patterns/:action?/:id?" component={MailsPatterns} />
                <ProtectedRoute path="/persons/:action" component={Persons} />
                <ProtectedRoute path="/spares/:action" component={SparesContainer} />
                <ProtectedRoute path="/reports/:action" component={ReportsContainer} />
                <ProtectedRoute path="/observers/:action" component={Observers} />
                <ProtectedRoute path="/business-events/:action" component={BusinessEvents} />
                <ProtectedRoute path="/platforms/:action" component={Platforms} />
                <ProtectedRoute path="/payments-sets/:action" component={PaymentsSetsContainer} />
                <ProtectedRoute path="/payments/:action/:id?" component={Payments} />
                <ProtectedRoute path="/purchase-requests/:action/:id?" component={PurchaseRequests} />
                <ProtectedRoute path="/tickets/:action/:id?" component={Tickets} />
                <ProtectedRoute path="/users/:action/:id?" authAllow={['confirmInvitation']} component={UsersContainer} />
                <ProtectedRoute path="/workflow/:action?/:id?" component={WorkflowContainer} />
                <ProtectedRoute path="/shifts/:action?/:id?" component={Shifts} />
                <ProtectedRoute path="/store/:action" component={Store} />
                <Route path="/auth/:action" exact component={AuthContainer}></Route>
            </Switch>
        </div>
    );
};

export default Router;
