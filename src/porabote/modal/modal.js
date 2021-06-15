import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal } from './modal-actions'

import ModalItem from './modal-item'
import ModalTab from './modal-tab'

class Modal extends Component {

    render() {
        console.log(this.props.items);
        return(
            <div className={this.props.isOpen ? "modal active" : "modal"}  onClick={this.props.closeModal}>
                <div className={this.props.isOpen ? "modal-box-wrap active" : "modal-box-wrap"} onClick={e => {e.stopPropagation()}}>
                    <div id="modal-tabs">
                        {this.props.items.map((data, key) => {
                            return <ModalTab data={data} itemkey={key} key={key}/>
                        })}
                    </div>
                        {this.props.items.map((data, itemKey) => { return <ModalItem data={data} key={itemKey} /> })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => (store.modal)
const mapDispatchToProps = { closeModal }

export default connect(mapStateToProps, mapDispatchToProps)(Modal)