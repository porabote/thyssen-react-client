import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {pushItemToModal, removeModalItem} from "porabote/modal/store/modal-actions";
import { openConfirm } from "porabote/confirm/store/confirm-actions";
import { requestDicts } from "../dicts/store/dicts-actions";
import Api from "@services";
import View from "./view";
import ViewPreloader from "../view/view-preloader";
import EditUserForm from "./edit-user-form";

const ViewContainer = (props) => {

  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);

  const { dictsRequired, title, meta, filter } = useSelector(state => state.users);
  const { components, dicts } = useSelector(state => state.dicts);

  const isDictsLoaded = components.users ? true : false;

  const [data, setData] = useState();
  const [loaded, setLoaded] = useState(false);
  const [isCanEdit, setIsCanEdit] = useState(false);
  const [isItOwn, setIsItOwn] = useState(false);

  useEffect(() => {
    document.title = `Пользователи`;
    dispatch(requestDicts(dictsRequired, 'users'));
    getRecord();
  }, [props.id]);

  const {relationships} = useSelector(state => state.users);

  const getRecord = () => {

    const {id} = props;

    Api.get(`/api/api-users/get/${id}/`, {
      query: {
        include: relationships
      }
    }).then((resp) => {
      setData(resp.data);
      setIsItOwn((resp.data.id == user.id) ? true : false);
      checkEditAccess();
    });
  }

  const checkEditAccess = () => {
    Api.get(`/api/api-users/method/checkEditAccess/`)
      .then((resp) => {
        setIsCanEdit(resp.data.isCanEdit);
        setLoaded(true);
      });
  }

  const editUser = (getRecord) => {
    dispatch(pushItemToModal(
      React.createElement(EditUserForm, { data, editUserConfirm, dicts, isItOwn, isCanEdit, getRecord }),
      `Редактировать данные пользователя`
    ));
  }

  const editUserConfirm = (values, modalKey, getRecord) => {
    Api.post(`/api/users/method/edit/`, {
      body: values
    }).then((resp) => {
      if( typeof resp.error != "undefined") {
        return dispatch(openConfirm(resp.error));
      }
      getRecord();
      dispatch(removeModalItem(modalKey));
    });
  }

  const sendInvitationNotification = (request_id) => {
    Api.get(`/api/users/method/sendInvitationNotification/${request_id}`)
      .then((resp) => {
        dispatch(openConfirm('Приглашение отправлено.'));
      });
  }

  if (!loaded) {
    return <ViewPreloader/>;
  }

  return (
    <View
      data={data}
      getRecord={getRecord}
      isCanEdit={isCanEdit}
      editUser={editUser}
      editUserConfirm={editUserConfirm}
      isItOwn={isItOwn}
      sendInvitationNotification={sendInvitationNotification}
    />
  );

}

export default ViewContainer;