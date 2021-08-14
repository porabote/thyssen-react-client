import React, { Component } from 'react'

class ModalItem extends Component {

    render() {

        return (
            <div className="modal-tabs-block active">
                <div className="modal-box">

                    <div className="modal-box-up">
                        <span>{this.props.data.title}</span>
                    </div>

                    <div className="modal-box-center">
                        {this.props.data.content}
                    </div>

                </div>
            </div>
        )
    }

}

export default ModalItem