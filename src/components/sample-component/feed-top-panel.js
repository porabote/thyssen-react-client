import React from 'react'
import SampleComponentAddForm from './sample-component-add-form'
import { connect } from 'react-redux'

class FeedTopPanel extends React.Component {

    render() {

        return(
            <React.Fragment>

                <div>
                    <span
                        onClick={() => {
                            this.props.pushModalItem(
                              this.props.dicts,
                              this.props.fetchData,
                              `Добавить оборудование ${this.props.title}`,
                            );
                        }}
                        className="button-drop"
                                >
                        Добавить
                    </span>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        pushModalItem: (dicts, fetchData, title) => dispatch({
            type: 'PUSH_MODAL_ITEM',
            payload: {
                title,
                content: React.createElement(SampleComponentAddForm, {dicts, fetchData})
            }
        }),
    }
}
export default connect(null, mapDispatchToProps)(FeedTopPanel);