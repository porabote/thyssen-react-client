import React from 'react'
import ReportsAddForm from './reports-add-form'
import { connect } from 'react-redux'

class ContentPanel extends React.Component {

    render() {

        return(
            <div>
                <span
                    onClick={() => {
                        this.props.pushModalItem(this.props.dicts, this.props.fetchData);
                    }}
                    className="content__tools_panel__item plus"
                            >
                    Добавить
                </span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pushModalItem: (dicts, fetchData) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title: 'Создать отчет',
                content: React.createElement(ReportsAddForm, {dicts, fetchData})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(ContentPanel)