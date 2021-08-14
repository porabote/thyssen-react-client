import React, { Component } from 'react'
import { Field, Select, Option } from '@porabote/form'
import DateTime from '@porabote/date-time'

class FilterLeft extends Component {

    constructor(props) {
        super(props);

        this.weeksList = DateTime.getWeeksList();
    }

    render() {

        if (!this.props.dicts) return <p>Данные загружаются...</p>;

        const types = this.props.dicts[0].list;
        const departments = this.props.dicts[1].list;

        return (

            <React.Fragment>
                <Field>
                    <Select
                        name="left.type_id"
                        label="Тип отчета:"
                        afterSelectCallback={(event, formContext) => {
                            formContext.submitForm()
                        }}
                    >
                        {Object.keys(types).map((id) => {
                            return <Option key={id} value={id}>{types[id].name}</Option>
                        })}
                    </Select>
                </Field>

                <Field>
                    <Select
                        name="left.object_id"
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

export default FilterLeft