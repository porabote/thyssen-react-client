import React, { Component } from 'react'
import { Form } from '@porabote/form'
import FilterLeft from './filter-left'
import FilterTop from './filter-top'
import { FeedList, FeedListRow } from '@porabote/feed-list'
import { post, get } from '@services/api-service'
import PaymentsSetsView from './payments-sets-view'
import moment from 'moment'

class PaymentsSets extends Component {

    state = {
        schema: [
            {
                field: 'id',
                name: 'Номер',
                width: '150px',
                element: null
            },
            {
                field: 'date_payment',
                name: 'Платежный день',
                width: '150px',
                element: (value) => {
                    moment.lang("ru")
                    return(
                        moment(value).format('DD.MM.YYYY')
                    )
                }
            },
            {
                field: 'week',
                name: 'Неделя',
                width: '150px',
                element: null
            },
            {
                field: 'summa_rur',
                name: 'Сумма RUR',
                width: '150px'
            },
            {
                field: 'summa_eur',
                name: 'Сумма EURO',
                width: '150px'
            },
            {
                field: 'rate_euro',
                name: 'Курс EURO',
                width: '150px'
            },
            // {
            //     field: 'payments_count',
            //     name: 'Платежей',
            //     width: '150px',
            //     element: null
            // },
            {
                field: 'date_created',
                name: 'Дата добавления',
                width: '150px',
                element: (value) => {
                    moment.lang("ru")
                    return(
                        moment(value).format('DD.MM.YYYY')
                    )
                }
            },
            {
                field: 'comment',
                name: 'Комментарий',
                width: '150px',
                element: null
            },
            // {
            //     field: 'object',
            //     name: 'Обьект',
            //     width: '150px',
            //     element: null
            // },
        ],
        data: [],
        filter: {
            seekString: ''
        }
    }

    componentDidMount() {

        post(`/api/payments-sets/get/`, {}).then((data) => {
            this.setState({
                data: data.data
            })
        })
    }

    render() {

        if (this.props.match.params.action === 'view') {
            return <PaymentsSetsView/>
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
                                    <FeedListRow key={index} to={`/payments-sets/view/${row.id}`} schema={this.state.schema} data={row}></FeedListRow>
                                )
                            })}
                        </FeedList>
                    </div>

                </div>

            </Form>
        )
    }
}

export default PaymentsSets