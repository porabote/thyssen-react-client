import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import moment from "moment";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { useHistory } from 'react-router';
import Api from "@services";
import View from "./view";
import ViewPreloader from "@components/view/view-preloader";
import Contractors from "../models/Contractors";

const ViewContainer = (props) => {

  moment.lang("ru");

  const { title } = useSelector(state => state.contractors);
  const [record, setRecord] = useState(null)

  const model = Contractors;

  useEffect(() => {
    document.title = title;
    getRecord();
  }, []);

  const getRecord = async () => {
    let record = await new model().get(props.id);
    setRecord(record);
  }

  if (!record) return <ViewPreloader tiile={title}/>

  return (
    <View
      model={model}
      record={record}
    />
  );

}

export default ViewContainer;
