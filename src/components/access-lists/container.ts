import React, {useEffect, useState} from "react";
import {registrationReducer, registrationSaga} from "@/store";
import {useAppDispatch, useAppSelector} from "@/app/hooks/hooks";
import {IMatch} from "@/routes/types";
import accessListsReducer from "./redux-store/reducer";
import sagaWatcher from "./redux-store/saga";
import {fetchFeedData, updateFeedFilters} from "./redux-store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";

interface IChildComponentProps extends React.Props<any> {
   match: IMatch<{
     id: string,
     action: string,
   }>;
   fetchFeedData: () => {type: string},
   filters: Object,
}

const AccessListsContainer = (props: IChildComponentProps): JSX.Element => {

  registrationReducer("accessLists", accessListsReducer);
  registrationSaga("accessLists", sagaWatcher);

  useEffect(() => {
    fetchData();
  }, []);

  const accessListsState = useAppSelector(state => state.accessLists);

  const fetchData: () => void = () => {
    fetchFeedData();
  }

  const updateFilters: Function = (values: any[]) => {
    updateFeedFilters(values);
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
      fetchFeedData: fetchData,
    });
  }

  return React.createElement(Feed, {
    isDictsLoaded: true,
    fetchData,
    updateFilters,
    //dicts: dictsState,
  });

}

export default AccessListsContainer;
