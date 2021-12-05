import React, { Component } from 'react'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

class Filterwhere extends Component {

    constructor(props) {
        super(props);
        this.weeksList = DateTime.getWeeksList();
        this.state = {
            dicts: []
        }
    }

    componentDidMount() {

        this.setState({
            dicts: this.props.dicts
        })
    }

    render() {

        const { departments, report_types } = this.props.dicts

        return (

            <React.Fragment>
                <div className="content__filter__left__title">Фильтр</div>
                <Field>
                    <Select
                        name="where.type_id"
                        label="Тип отчета:"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(report_types).map((id) => {
                            return <Option key={id} value={id}>{report_types[id].name}</Option>
                        })}
                    </Select>
                </Field>

                <Field>
                    <Select
                        name="where.object_id"
                        label="Обьект"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(departments).map((id) => {
                            if (departments[id].custom_type == 5) {
                                return <Option key={id} value={id}>{departments[id].name}</Option>
                            }
                        })}
                    </Select>
                </Field>
            </React.Fragment>

        )
    }

}

export default Filterwhere