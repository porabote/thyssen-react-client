import React, { useEffect } from "react";
import ws from "./ws-service";
import RoomContainer from "./room-container.tsx";
import DialogsContainer from "./dialogs-container.tsx";

const Chat = () => {

  let wss = ws();
 // console.log(wss);

  return (
    <div className="chat">
      <DialogsContainer/>
      <RoomContainer/>
    </div>
  );

};

export default Chat