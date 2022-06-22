import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Api from "@services/api-service";
import { requestDicts } from "../dicts/store/dicts-actions";
import { pushItemToModal, removeModalItem } from "porabote/modal/store/modal-actions";
import { fetchFeedData, updateFeedFilters } from "@components/tickets/store/tickets-actions";
import View from "./view";
import Feed from "./feed";
import { useHistory } from 'react-router';

const TicketsContainer = (props) => {

  const dispatch = useDispatch();
  const history = useHistory();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.tickets);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.tickets ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'tickets'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }

  const createTicket = (values, modalKey) => {
    Api.post(`/api/tickets/method/create/`,{ body: values })
      .then((resp) => {
        dispatch(removeModalItem(modalKey));
        history.push(`/tickets/view/${resp.data.id}`);
      });
  }

  if (props.match.params.action === "view") {
    return React.createElement(View, {
      dataSource: `/api/tickets/get/${props.match.params.id}`,
      storeAlias: 'tickets',
    });
  }
  
  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters,
    createTicket,
  });
}

export default TicketsContainer;