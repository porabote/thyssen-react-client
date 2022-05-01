import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dialogs from "./dialogs.tsx";
import { getUsers, setDialog, fetchDialogs } from "./store/chat-actions";

const DialogsContainer = () => {

  const dispatch = useDispatch();

  const { dialogs, users } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  const [usersList, setUsersList] = useState(users);

  const searchByUsersList = (e) => {
    if (e.target.value.length > 0) {
      let usersList = users.filter((item) => {
        if (
          typeof item.attributes !== "undefined"
          && item.attributes.name.toLowerCase().search(e.target.value.toLowerCase()) != -1
        ) {
          return item;
        }
      });
      setUsersList(usersList);
    }
  }

  const setActiveDialog = (userId) => {
    dispatch(setDialog(user.id, userId));
  }

  useEffect(() => {
    dispatch(getUsers());
    dispatch(fetchDialogs());
  }, []);

  return(
    <Dialogs
      dialogs={dialogs}
      usersList={usersList}
      setActiveDialog={setActiveDialog}
      searchByUsersList={searchByUsersList}
    />
  );
}

export default DialogsContainer;