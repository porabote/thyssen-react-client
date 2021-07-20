import React, { Component } from 'react'
import { Form } from '@porabote/form'
import FilterLeft from './filter-left'
import FilterTop from './filter-top'
import { FeedList, FeedListRow } from '@porabote/feed-list'
import { post, get } from '@services/api-service'
import ReportsView from './reports-view'
import moment from 'moment'

class Reports extends Component {

    state = {
        schema: [
            {
                name: 'Тип отчета',
                width: '100px',
                field: 'type_id'
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
                field: 'object_id'
            },
            {
                name: 'Дата добавления',
                width: '140px',
                field: 'date_created'
            }
        ],
        data: [],
        filter: {
            seekString: ''
        }
    }

    componentDidMount() {

        post(`/api/reports/get/`, {}).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : []
            })
        })
    }

    render() {

        if (this.props.match.params.action === 'view') {
            return <ReportsView/>
        }

        return(

            <Form
                values={this.state.filter}
            >

                <div className="content feed">

                    <div className="content__top-filter">
                        <FilterTop/>
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft />
                    </div>

                    <div className="content__body">
                        <FeedList schema={this.state.schema}>
                            {this.state.data.map((row, index) => {
                                return(
                                    <FeedListRow key={index} to={`/reports/view/${row.id}`} schema={this.state.schema} data={row}></FeedListRow>
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