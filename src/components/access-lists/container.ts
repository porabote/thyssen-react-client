import React, {useEffect, useState} from "react";
import {useDispatch, useSelector, useStore} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import { useHistory } from 'react-router';
import Api from "@services";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {fetchFeedData, updateFeedFilters} from "./store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";
import reducerRegistry from "@store/reducer-registry";
import accessListsReducer from "./store/reducer";
import sagaWatcher from "./store/saga";


interface IChildComponentProps extends React.Props<any> {
   fetchFeedData: Function,
   filters: Object,
}

const AccessListsContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  useStore().injectReducer("accessLists", accessListsReducer);
  useStore().injectSaga("accessLists", sagaWatcher);

  const {components, dicts} = useSelector(state => state.dicts);
  const {dictsRequired, title, meta, filter} = useSelector(state => state.accessLists);


  const isDictsLoaded = components.accessLists ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'accessLists'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }


  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
      fetchFeedData: fetchData,
    });
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    dicts,
  });

}

export default AccessListsContainer;