import React from "react";
//import Background from './ava.png'

const Message = (props) => {

  return(
    <div className="chat-window-msgs-list__msg">
      <div className="msgs-list__msg__avatar">
        <div
          className="msgs-list__msg__avatar__img"

        >{props.avatar}</div>
      </div>
      <div className="msgs-list__msg__name">{props.name}</div>
      <div className="msgs-list__msg__text">{props.msg}</div>
    </div>
  )
}

export default Message
//style={{backgroundImage: `url(${Background})`}}