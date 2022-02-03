import React from "react";
import { connect } from "react-redux";
import Message from "./message";
import Panel from "./panel";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

class Room extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      messages: [
        {
          name: props.user.name,
          avatar: props.user.avatar,
          msg: "Зашел в чат."
        }
      ]
    }
  }

  _addMsg = (data) => {

    this.setState({
      messages: [...this.state.messages, data]
    })
  }

  componentDidMount() {
    this.props.ws.onmessage = e => {
      this._addMsg(JSON.parse(e.data));
    }
  }

  _sendMsg = messageString => {

    const message = {
      name: this.props.user.username,
      msg: messageString,
      date: Date.now()
    }

    this.props.ws.send(JSON.stringify(message))

    window.scrollTo(0,1000);//document.body.scrollHeight

    //this._addMsg(message)
  }

  render() {

    if(!this.state.messages.length) {
      return <div className="no-records">Нет записей.</div>
    }

    return(
      <React. Fragment>

        <div className="chat-window-msgs-list">
          {this.state.messages.map((msg, index) => {
            return <Message key={index} {...msg} />
          })}
        </div>

        <Panel sendMsg={this._sendMsg} />

      </React.Fragment>
    )
  }
}

const mapStateToProps = store => ({
  chat: store.chat,
  user: store.auth.user,
})

const mapDispatchToProps = (dispatch) => {
  return {
    //action: addMsgThunk
  }
}

export default connect(mapStateToProps)(Room)