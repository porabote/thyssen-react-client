import React, { Component } from 'react'
import { Form } from 'porabote/form'
import FilterLeft from './filter-left'
import ContentPanel from './content-panel'
import FilterTop from './filter-top'
import { FeedList, FeedListRow } from 'porabote/feed-list'
import Api from '@services/api-service'
import ReportsView from './reports-view'
import moment from 'moment'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import MenuIcon from '@material-ui/icons/Menu';

class Reports extends Component {

    state = {
        schema: [
            {
                name: 'ID',
                width: '60px',
                field: 'id'
            },
            {
                name: 'Тип отчета',
                width: '140px',
                field: 'type_id',
                element: (value) => {
                    let name = 'Не указано';
                    let report_types_dict = this.state.dicts.report_types;
                    if (this.state.dicts) {
                        name  = report_types_dict[value]['name']
                    }
                    return name;
                }
            },
            {
                name: 'На дату',
                width: '170px',
                field: 'date_period',
                element: (value) => {
                    if(value) return (<span>{moment(value).format("DD MMM YYYY")}</span>);
                }
            },
            {
                name: 'Объект',
                width: '140px',
                field: 'object_id',
                element: (value) => {
                    let name = 'Не указано';
                
                    let departments_dict = this.state.dicts.departments;
                    if (this.state.dicts) {
                        name  = departments_dict[value]['name']
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
                name: 'Добавил',
                width: '180px',
                field: 'user_id',
                element: (value) => {
                    let name = 'Не указано';
                    if (this.state.dicts) {
                        if (typeof this.state.dicts.users[value] !== "undefined") {
                            name = `${this.state.dicts.users[value]['name']} (${this.state.dicts.users[value]['post_name']})`
                        }
                    }
                    return name;
                }
            },
            {
                name: 'Дата добавления',
                width: '140px',
                field: 'created_at',
                element: (value) => {
                    if(value) return moment(value).format("DD MMM YYYY");
                }
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
                    id: [1, 2, 3]
                }
            }
        }).then((data) => {

            let dicts = {};

            data.data.map((dict, index) => {
                dicts[dict['type']] = dict.data;
            })

            this.setState({
                dicts: dicts
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

        moment.lang("ru");

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
                        {/*<FilterTop/>*/}
                    </div>

                    <div className="content-title">
                        <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
                        Отчеты
                    </div>

                    <div className="content__filter__left">
                        <FilterLeft dicts={dicts} />
                    </div>

                    <div className="content__tools_panel">
                        <ContentPanel fetchData={this.fetchData} dicts={dicts} />
                    </div>

                    <div className="content__body">
                        <FeedList schema={this.state.schema}>
                            {data.map((row, index) => {
                                return(
                                    <FeedListRow dicts={this.state.dicts} key={index} to={`/reports/view/${row.id}`} schema={this.state.schema} data={row}></FeedListRow>
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