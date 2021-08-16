import React, { Component } from 'react'
import { Form } from '@porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import { FeedList, FeedListRow } from '@porabote/feed-list'
import Api from '@services/api-service'
import ReportsView from './reports-view'
import moment from 'moment'

class Reports extends Component {

    state = {
        schema: [
            {
                name: 'Тип отчета',
                width: '140px',
                field: 'type_id',
                element: (value) => {
                    let name = 'Не указано';
                    if (this.state.dicts) {
                        if (typeof this.state.dicts[0].list[value] !== "undefined") {
                            name  = this.state.dicts[0].list[value]['name']
                        }
                    }
                    return name;
                }
            },
            {
                name: 'Комментарий',
                width: '180px',
                field: 'comment'
            },
            {
                name: 'Дата (на период)',
                width: '120px',
                field: 'date_period'
            },
            {
                name: 'Объект',
                width: '140px',
                field: 'object_id',
                element: (value) => {
                    let name = 'Не указано';
                    if (this.state.dicts) {
                        if (typeof this.state.dicts[1].list[value] !== "undefined") {
                            name  = this.state.dicts[1].list[value]['name']
                        }
                    }
                    return name;
                }
            },
            {
                name: 'Дата добавления',
                width: '140px',
                field: 'created_at'
            }
        ],
        data: [],
        dicts: null,
        filter: {
            left: {
                object_id: '',
                type_id: ''
            },
            seekString: ''
        }
    }

    componentDidMount() {

        Api.get(`/api/dicts/get/`, {
            query: {
                whereIn: {
                    id: [1, 2]
                }
            }
        }).then((data) => {
            this.setState({
                dicts: (typeof data.data !== 'undefined') ? data.data : []
            })
        })

        this.fetchData()
    }

    fetchData = (query) => {

        Api.get(`/api/reports/get/`, {
            query
        }).then((response) => {
            this.setState({
                data: (typeof response.data !== 'undefined') ? response.data : []
            })
        })
    }

    submitForm = (values) => {

        let query = {
            where: {
                '=': values.left
            }
        }
        this.fetchData(query)
    }

    render() {

        if (this.props.match.params.action === 'view') {
            return <ReportsView/>
        }

        const { data, dicts } = this.state
        if (!dicts) return <p>Данные загружаются</p>

        return(

            <Form
                values={this.state.filter}
                submitForm={this.submitForm}
            >
                <div className="content feed">

                    <div className="content__top-filter">
                        <FilterTop/>
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft dicts={dicts} />
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel dicts={dicts} />
                    </div>

                    <div className="content__body">
                        <FeedList schema={this.state.schema}>
                            {data.map((row, index) => {
                                return(
                                    <FeedListRow dicts={this.state.dicts} key={index} to={`/reports/view/${row.id}`} schema={this.state.schema} data={row.attributes}></FeedListRow>
                                )
                            })}
                        </FeedList>
                    </div>

                </div>

            </Form>
        )
    }
}

export default Reports