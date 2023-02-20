import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { requestDicts } from "../dicts/redux-store/dicts-actions";
import { fetchFeedData, updateFeedFilters } from "@/components/payments-sets/redux-store/actions";
import View from "./payments-sets-view";
import Feed from "./feed";

interface IChildComponentProps extends React.Props<any> {
  // fetchFeedData: Function,
  // filters: Object,
}

const PaymentsSetsContainer = (props: IChildComponentProps) => {

  const dispatch = useDispatch();

  const { dictsRequired, title, meta, filter } = useSelector(state => state.paymentsSets);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.paymentsSets ? true : false;

  useEffect(() => {
    dispatch(requestDicts(dictsRequired, 'paymentsSets'));
    fetchData();
  }, []);

  const fetchData: Function = () => {
    dispatch(fetchFeedData());
  }

  const updateFilters: Function = (values: Object) => {
    dispatch(updateFeedFilters(values));
  }


  if (props.match.params.action === "view") {
    return React.createElement(View);
  }

  return React.createElement(Feed, {
    isDictsLoaded,
    fetchData,
    updateFilters
  });

}

export default PaymentsSetsContainer;
