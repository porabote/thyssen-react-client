import React, { Component } from "react";
import SendIcon from '@mui/icons-material/Send';
//import PropTypes from 'prop-types'

class Panel extends Component {

  // static propTypes = {
  //     onSubmitMessage: PropTypes.func.isRequired,
  // }

  state = {
    message: '',
  }

  render() {
    return(
      <div className="chat-panel">
                <textarea
                  className="chat-panel-textarea"
                  placeholder={'Введите сообщение'}
                  value={this.state.message}
                  onChange={e => this.setState({ message: e.target.value })}
                ></textarea>

        <SendIcon
          className="chat-panel-button"
          onClick={() => {
            this.props.sendMsg(this.state.message);
            this.setState({
              message: ''
            })
          }}
        >
          Отправить сообщение
        </SendIcon>

      </div>
    )
  }
}

export default Panel