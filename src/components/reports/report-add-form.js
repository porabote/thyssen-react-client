import React, { Component } from 'react'
import { Form, Field, InputHidden, Input, Button, SubmitButton, Select, Option } from '@porabote/form'

class ReportAddForm extends Component {

    render() {

        const types = this.props.dicts[0].list;
        const departments = this.props.dicts[1].list;

        return (
            <div>
                <Form
                    values={{
                        id: null,
                        comment: ''
                    }}
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
                            name="left.type_id"
                            label="Тип отчета:"
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
                        >
                            {Object.keys(departments).map((id) => {
                                if (departments[id].custom_type == 5) {
                                    return <Option key={id} value={id}>{departments[id].name}</Option>
                                }
                            })}
                        </Select>
                    </Field>

                    <SubmitButton>
                        <Button color="primary" variant="contained" fullWidth type="submit">
                            Submit
                        </Button>
                    </SubmitButton>
                </Form>
            </div>

        )
    }

}

export default ReportAddForm