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
                        name="week"
                        label="Неделя"
                    >
                        {this.weeksList .map((title, weekNumber) => {
                            return <Option key={weekNumber} value={weekNumber}>{title}</Option>
                        })}
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
                        <Option key={89} value={89}>Шщ</Option>
                        <Option key={891} value={891}>Шщ</Option>
                    </Select>
                </Field>
            </React.Fragment>

        )
    }

}

export default FilterLeft