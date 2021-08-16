import React, { Component } from 'react'
import { Form, Field, InputHidden, Input, Button, SubmitButton, Select, Option } from '@porabote/form'
import DatePicker from 'react-date-picker';

class ReportAddForm extends Component {

    render() {

        const types = this.props.dicts[0].list;
        const departments = this.props.dicts[1].list;

        return (
            <div>

                <div>
                    <DatePicker
                    

                    />
                </div>

                <Form
                    values={{
                        id: null,
                        comment: ''
                    }}
                    action="/api/reports/add/"
                >

                    <Field>
                        <InputHidden
                            name="id"
                        />
                    </Field>

                    <Field>
                        <Input
                            label="Комментарий"
                            name="comment"
                        />
                    </Field>

                    <Field>
                        <Select
                            name="type_id"
                            label="Тип отчета:"
                        >
                            {Object.keys(types).map((id) => {
                                return <Option key={id} value={id}>{types[id].name}</Option>
                            })}
                        </Select>
                    </Field>

                    <Field>
                        <Select
                            name="object_id"
                            label="Обьект"
                        >
                            {Object.keys(departments).map((id) => {
                                if (departments[id].custom_type == 5) {
                                    return <Option key={id} value={id}>{departments[id].name}</Option>
                                }
                            })}
                        </Select>
                    </Field>



                    <SubmitButton>
                        <Button
                            text="Сохранить"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </SubmitButton>
                </Form>
            </div>

        )
    }

}

export default ReportAddForm