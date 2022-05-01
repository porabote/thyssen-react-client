import React from "react";
import {connect} from "react-redux";
import Message from "./message";
import Panel from "./panel";
import DownloadDoneIcon from "@mui/icons-material/DownloadDone";

const Room = (props) => {

  const {messages} = props;

  if (!props.activeRoomId) {
    return <div className="no-records">Диалог не выбран.</div>
  }

  if (!messages.length) {
    return <div className="no-records">Переписка пуста.</div>
  }

  return (
    <React.Fragment>

      <div className="chat-window-msgs-list">
        {messages.map((msg, index) => {
          return <Message key={index} {...msg} />
        })}
      </div>

      <Panel sendMsg={this._sendMsg}/>

    </React.Fragment>
  )
}

export default Room;