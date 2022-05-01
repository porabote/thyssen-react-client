import React, { useState, useEffect, useCallback } from "react";
import {CHAT_DOMAIN, CHAT_PORT} from "@configs";

const ws = () => {

  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!isConnected) {
      ws.current = new WebSocket(`${CHAT_DOMAIN}:${CHAT_PORT}`);
      ws.current.onopen = () => setStatus(1);
      ws.current.onclose = () => setStatus(0);

      listeningStream();
    }
    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isConnected]);

  const listeningStream = useCallback(() => {
    if (!ws.current) return;
    ws.current.onmessage = e => {                //подписка на получение данных по вебсокету
      if (!isConnected) return;
      const message = JSON.parse(e.data);
      setMessage(message);
    };
  }, [isConnected]);

//   ws.onopen = () => {
//
//     if (ws.readyState === 1) {
//       console.log('Server is connected')
//       ws.send(JSON.stringify(data))
//     }
//
//   }
//
//   ws.onmessage = e => {
// //console.log(e.data);
//     // const data = JSON.parse(e.data)
//     // this._addMsg(data)
//   }
//
//   ws.onclose = () => {
//     console.log('disconnected')
//     // automatically try to reconnect on connection loss
//     // this.setState({
//     //   ws: new WebSocket(wsServerUrl),
//     // })
//   }

}

export default ws;