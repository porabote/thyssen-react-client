import React from "react";

const Message = (props) => {

  return(
    <div className="chat-room-msgs-list__msg">
      <div className="msgs-list__msg__avatar">
        <div
          className="msgs-list__msg__avatar__img"
          style={{backgroundImage: `url('${props.avatar}')`}}

        ></div>
      </div>
      <div className="msgs-list__msg__name">{props.name}</div>
      <div className="msgs-list__msg__text">{props.msg}</div>
    </div>
  )
}

export default Message
//style={{backgroundImage: `url(${Background})`}}