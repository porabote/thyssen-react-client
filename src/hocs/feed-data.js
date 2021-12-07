import React from 'react'
import { connect } from 'react-redux'
import Loader from 'porabote/loader'
import Api from '@services/api-service'
import { Form, ButtonLazyLoad } from 'porabote/form'

export default (Component, props = {}) => {

    class feedData extends React.Component {

        state = {
            filter: {}
        }

        componentDidMount() {

            this.setState({filter: this.props.filter})
            this.getDicts();
        }

        getDicts = (aliases) => {

            Api.get(`/api/dicts/get/`, {
                query: {
                    whereIn: {
                        assoc_table: this.props.dicts.required
                    }
                }
            }).then((data) => {

                if (this.props.dicts.loaded) return this.fetchData();

                const dicts = {};
                data.data.map((dict, index) => {
                    dicts[dict['type']] = dict['data'];
                })

                this.props.fetchDicts({
                    storage: dicts,
                    required: this.props.dicts.required,
                    loaded: this.props.dicts.required.length == Object.keys(dicts).length ? true : false
                })

                return this.fetchData()
            })
        }

        fetchData = () => {
            Api.get(`/api/${props['storeAlias']}/get/`, {
                query: {
                    where: this.props.filter,
                    include: this.props.include,
                    page: this.props.meta.page
                }
            }).then((response) => {

                this.setState({
                    data: [...this.state.data, ...response.data],
                    meta: response.meta,
                    page: ++this.state.page
                })

            })
        }

        setData = (response) => {
            this.setState({
                data: [...this.state.data, ...response.data],
                meta: response.meta,
                page: ++this.state.page
            })
        }

        render() {

            if (this.props.data.loading) return <Loader/>

            return(
                <Form
                    values={this.props.filter}
                    submitForm={this.submitForm}
                >
                    <Component/>
                </Form>
            )
        }
    }

    const mapStateToProps = (state) => {
        return({...state[props['storeAlias']]})
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            fetchDicts: (dicts) => dispatch({
                type: 'FETCH_DICTS',
                payload: dicts
            }),
            fetchData: (data) => dispatch({
                type: 'FETCH_DATA',
                payload: data
            })
        }
    }

    return connect(mapStateToProps, mapDispatchToProps)(feedData)
}