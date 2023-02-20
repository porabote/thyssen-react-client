import React, {useEffect, useState} from "react";
import {registrationReducer, registrationSaga} from "@/store";
import {useAppSelector} from "@/app/hooks/hooks";
import {IMatch} from "@/routes/types";
import PurchaseRequestsReducer from "./redux-store/reducer";
import sagaWatcher from "./redux-store/saga";
import {fetchFeedData, updateFeedFilters} from "./redux-store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";
import FeedPreloader from "@/components/feed/feed-preloader";

interface IChildComponentProps extends React.Props<any> {
   match: IMatch<{
     id: string,
     action: string,
   }>;
   fetchFeedData: () => {type: string},
   filters: Object,
}

const Container = (props: IChildComponentProps): JSX.Element => {

  registrationReducer("purchase_requests", PurchaseRequestsReducer);
  registrationSaga("purchase_requests", sagaWatcher);

  useEffect(() => {
    fetchData();
  }, []);

  const purchaseRequestsState = useAppSelector(state => state.purchase_requests);

  const fetchData: () => void = () => {
    fetchFeedData();
  }

  const updateFilters: Function = (values: any[]) => {
    updateFeedFilters(values);
  }

  if (props.match.params.action === "view") {
    return <ViewContainer id={props.match.params.id} fetchFeedData={fetchData}/>;
  }

  return React.createElement(Feed, {
    isDictsLoaded: true,
    fetchData,
    updateFilters,
    //dicts: dictsState,
  });

}

export default Container;
