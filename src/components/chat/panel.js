import React, { Component } from 'react'
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
      <div className="panel">
                <textarea
                  className="chat-panel-textarea"
                  placeholder={'Введите сообщение...'}
                  value={this.state.message}
                  onChange={e => this.setState({ message: e.target.value })}
                ></textarea>
        <button
          className="chat-panel-button"
          onClick={() => {
            this.props.sendMsg(this.state.message);
            this.setState({
              message: ''
            })
          }}
        >Отправить сообщение</button>
      </div>
    )
  }
}

export default Panel