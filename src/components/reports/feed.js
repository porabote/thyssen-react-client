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
                    id: [1, 2, 3]
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

        Api.get(`/api/reports/get/`, {
            query: {
                where: this.state.filter.where,
                include: [
                    'user', 'object', 'types'
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
        if (dicts.length == 0) return <p>Данные загружаются</p>

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
                        Отчёты
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft dicts={dicts} />
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel fetchData={this.fetchData} dicts={dicts} />
                    </div>

                    <div className="content__body">

                        <Grid grid-template-columns="60px 140px 170px 140px 180px 180px 180px">

                            <div className="head">
                                <div>ID</div>
                                <div>Тип отчета</div>
                                <div>На дату</div>
                                <div>Объект</div>
                                <div>Комментарий</div>
                                <div>Добавил</div>
                                <div>Дата добавления</div>
                            </div>

                            {
                                data.map((record, index) => {

                                    const attrs = record.attributes
                                    let rels = record.relationships;

                                    return(
                                        <div linkTo={`/reports/view/${attrs.id}`} key={attrs.id}>
                                            <div>{attrs.id}</div>
                                            <div>{record.relationships.types.attributes.name}</div>
                                            <div>{moment(attrs.date_period).format("DD/MM/YYYY")}</div>
                                            <div>{typeof rels.object !== "undefined" && rels.object.attributes.name}</div>
                                            <div>{attrs.comment}</div>
                                            <div>{record.relationships.user.attributes.name}</div>
                                            <div>{moment(attrs.created_at).format("DD/MM/YYYY")}</div>
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