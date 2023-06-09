import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from "react-router-dom";
import { useHistory } from 'react-router';
import Api from "@/services";
import {requestDicts} from "@/components/dicts/redux-store/dicts-actions";
import {fetchFeedData, updateFeedFilters} from "./redux-store/actions";
import ViewContainer from "./view/view-container";
import Feed from "./feed/feed";


interface IChildComponentProps extends React.Props<any> {
   fetchFeedData: Function,
   filters: Object,
}

const MailsContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const {dictsRequired, title, meta, filter} = useSelector(state => state.mailsPatterns);
  const {components, dicts} = useSelector(state => state.dicts);

  const isDictsLoaded = components.mailsPatterns ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'mailsPatterns'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const addRecord = (values) => {
    Api.post(`/api/mails-patterns/method/create/`,{
      body: values,
    })
    .then((resp) => {
      //dispatch(removeModalItem(modalKey));
      //history.push(`/tickets/view/${resp.data.id}`);
    });
  }

  if (props.match.params.action === "view") {
    return React.createElement(ViewContainer, {
      id: props.match.params.id,
      fetchFeedData: fetchData,
    });
  }

  // if (props.match.params.action === "sort-list") {
  //   return React.createElement(SortList, {
  //     isDictsLoaded,
  //     fetchData,
  //     updateFilters,
  //     dicts,
  //     addRecord,
  //   });
  // }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    dicts,
    addRecord,
  });

}

export default MailsContainer;
