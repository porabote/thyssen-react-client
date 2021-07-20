import React, { Component } from 'react'
import { Field, Select, Option } from '@porabote/form'
import DateTime from '@porabote/date-time'

class FilterLeft extends Component {

    constructor(props) {
        super(props);

        this.weeksList = DateTime.getWeeksList();
    }

    render() {

        return (

            <React.Fragment>
                <Field>
                    <Select
                        name="report_type_id"
                        label="Тип отчета:"
                    >
                    </Select>
                </Field>

                <Field>
                    <Select
                        name="object_id"
                        label="Обьект"
                        url='/api/departments/get/'
                        setOption={(data) => {
                            return <Option key={data.id}>{data.name}</Option>
                        }}
                    >
                    </Select>
                </Field>
            </React.Fragment>

        )
    }

}

export default FilterLeft