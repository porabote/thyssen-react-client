import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Room from "./room.tsx";
import {getMessages, sendMessage} from "./store/chat-actions";

const RoomContainer = () => {

  const dispatch = useDispatch();

  const { messages, activeRoomId } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  const sendMsg = messageString => {

    const message = {
      name: user.username,
      msg: messageString,
      date: Date.now()
    }

    this.props.ws.send(JSON.stringify(message))

    window.scrollTo(0,1000); //document.body.scrollHeight

    //this._addMsg(message)
  }

  useEffect(() => {
    dispatch(getMessages());
  }, []);

  return (
    <Room messages={messages} activeRoomId={activeRoomId} />;
  )
  ;
}

export default RoomContainer;