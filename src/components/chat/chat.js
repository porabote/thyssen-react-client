import React from 'react';
import { connect } from "react-redux";
//import ChatServer from "porabote/chat";
import { addMsgThunk, sendMsg } from './store/chat-actions'
import { CHAT_DOMAIN, CHAT_PORT } from '@configs'
//import ChatLogin from './chat-login'
import Room from './room'
import Dialogs from './dialogs'

class Chat extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: null
      },
      // messages: [],
      activeDialogId: null
    }

  }

  ws = new WebSocket(`${CHAT_DOMAIN}:${CHAT_PORT}`)

  // componentDidMount() {
  //
  //     if(this.state.user.username) {
  //         this._connectToServer()
  //     }
  // }

  _connectToServer = (data) => {

    this.ws.onopen = () => {

      if(this.ws.readyState === 1) {
        console.log('Server is connected')
        this.ws.send(JSON.stringify(data))
      }

    }

    this.ws.onmessage = e => {
//console.log(e.data);
      // const data = JSON.parse(e.data)
      // this._addMsg(data)
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(wsServerUrl),
      })
    }

  }

  setActiveDialog = (id) => {

  }


  _setDialog = (id) => {
    this.setState({
      activeDialogId: id
    })
  }
  
    render() {

        //if (!this.state.user.username) return <ChatLogin login={this._login}/>

        return (
            <div className="chat">

                <Dialogs dialogs={this.state.dialogs} activeDialogId={this.state.activeDialogId}/>

                <div className="chat-room">
                    <Room ws={this.ws} user={this.state.user} addMsg={this._addMsg}/>
                </div>

            </div>
        );
    }
};

const mapStateToProps = store => ({
    msgs: store.msgs
})

const mapDispatchToProps = (dispatch) => {
    return {
        action: addMsgThunk
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)