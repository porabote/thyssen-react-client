import React from 'react'
import Grid from 'porabote/grid'
import { Form, ButtonLazyLoad } from 'porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import MenuIcon from '@material-ui/icons/Menu'
import Stringer from 'porabote/stringer'
import Api from '@services/api-service'
import moment from 'moment'

class Feed extends React.Component {


    state = {
        page: 1,
        data: [],
        meta: [],
        dicts: [],
        filter: {
            where: {
                week: '',
                id: {
                    operand: 'like',
                    pattern: '%T%',
                    value: ''
                }
            },
            whereIn: {
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

            const dicts = {};
            data.data.map((dict, index) => {
                dicts[dict['type']] = dict['data'];
            })

            this.setState({
                dicts: dicts
            })
        })

        this.fetchData()
    }

    fetchData = () => {

        Api.get(`/api/payments-sets/get/`, {
            query: {
                where: this.state.filter.where,
                include: [
                    'payments.object'
                ],
                page: this.state.page
            }
        }).then((response) => {
            this.setState({
                data: [...this.state.data, ...response.data],
                meta: response.meta,
                page: ++this.state.page
            })
        })
    }


    submitForm = (values) => {
        this.setState({
            data: [],
            page: 1
        }, () => {
            this.fetchData()
        })

    }

    render() {

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

                    <div className="content-title">
                        <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
                        Планы оплат
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft dicts={dicts} />
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel fetchData={this.fetchData} dicts={dicts} />
                    </div>

                    <div className="content__body">

                        <Grid grid-template-columns="60px 100px 140px 120px 120px 180px 170px 120px 180px">

                            <div className="head">
                                <div>ID</div>
                                <div>Неделя</div>
                                <div>Дата платежа</div>
                                <div>Курс EURO</div>
                                <div>Курс USD</div>
                                <div>Сумма EUR</div>
                                <div>Сумма RUR</div>
                                <div>Объекты</div>
                                <div>Создано</div>
                            </div>

                            {
                                data.map((record, index) => {

                                    const attrs = record.attributes

                                    let summa = 0;
                                    record.relationships.payments.map(payment => {
                                        summa += parseFloat(payment.attributes.summa)/parseFloat(attrs.rate_euro)
                                    })

                                    let summaRur = 0;
                                    record.relationships.payments.map(payment => {
                                        summaRur += parseInt(payment.attributes.summa)
                                    })

                                    let objects = '';
                                    let objectsList = {};
                                    record.relationships.payments.map(payment => {
                                        if (
                                            typeof payment.relationships.object != "undefined"
                                            && typeof objectsList[payment.relationships.object.attributes.name] == "undefined"
                                        ) {
                                            objects += `${payment.relationships.object.attributes.name}; `
                                            objectsList[payment.relationships.object.attributes.name] = payment.relationships.object.attributes.name;
                                        }
                                    })

                                    return(
                                        <div linkTo={`/payments-sets/view/${attrs.id}`} key={attrs.id}>
                                            <div>{attrs.id}</div>
                                            <div>{attrs.week}</div>
                                            <div>{moment(attrs.date_payment).format("DD/MM/YYYY")}</div>
                                            <div>{attrs.rate_euro}</div>
                                            <div>{attrs.rate_usd}</div>
                                            <div>
                                                {Stringer.toSummaFormat(summa)}
                                            </div>
                                            <div>
                                                {Stringer.toSummaFormat(summaRur)}
                                            </div>
                                            <div>{objects}</div>
                                            <div>{moment(attrs.date_created).format("DD/MM/YYYY")}</div>
                                        </div>
                                    )
                                })
                            }
                        </Grid>

                        <ButtonLazyLoad meta={this.state.meta} fetch={this.fetchData} page={this.state.page}/>

                    </div>
                </div>
            </Form>


        )
    }
}

export default Feed