import React from 'react'
import { connect } from 'react-redux'
import Loader from 'porabote/loader'
import Api from '@services/api-service'

const feedData = (Component, dataSource, params = {}) => {

    return class extends React.Component {

        state = {
            page: 1,
            data: [],
            meta: [],
            dataSource: this.props.dataSource,
            loading: true
        }

        componentDidMount() {
            this.getDicts(params.dicts);
        }

        getDicts = (aliases) => {
            Api.get(`/api/dicts/get/`, {
                query: {
                    whereIn: {
                        assoc_table: params.dicts
                    }
                }
            }).then((data) => {

                const dicts = {};
                data.data.map((dict, index) => {
                    dicts[dict['type']] = dict['data'];
                })

                this.setState({
                    dicts: dicts
                })
            })
        }

        render() {

            if (this.state.loading) return <Loader/>

            return(
                <Form
                    values={this.state.filter}
                    submitForm={this.submitForm}
                >
                    <Component/>
                </Form>
            )
        }
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return({
        //spares: state.modal
    })
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch({
            type: 'CLOSE_MODAL'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(feedData)