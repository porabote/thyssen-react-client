import React, { Component } from 'react'
import { connect } from 'react-redux'
import { removeItem } from './modal-actions'

class ModalTab extends Component {

    removeItemHandler = () => {
        this.props.removeItem(this.props.itemkey, this.props.items.length)
    }

    render() {
        return(
            <div className="modal-tabs-item active" key={this.props.itemkey}>
                <span className="modal-tabs-item__link">{this.props.data.title}</span>
                <span className="modal-tabs-item__close modal-close" item-key={this.props.itemkey} onClick={this.removeItemHandler}></span>
            </div>
        )
    }
}

const mapStateToProps = store => (store.modal)
const mapDispatchToProps = {
    removeItem
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTab)