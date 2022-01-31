import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Form,
    Field,
    InputHidden,
    Input,
    Button,
    SubmitButton,
    Select,
    Option,
    InputDate
} from 'porabote/form';
import { withDictsData } from "@hocs";

class SparesAddForm extends Component {

    render() {

        const { objects } = this.props.dicts;

        return (
            <div>

                <Form
                    values={{
                        //
                        // comment: '',
                        // date_period: null
                    }}
                    action="/api/spares/add/"
                    submitFormAfter={(resp) => {
                        window.location = `/porabote/spares/view/${resp.data.id}`
                    }}
                >
                    <Field>
                        <Input
                          label="Название"
                          name="name"
                        />
                    </Field>
                    <Field>
                        <Input
                          label="Описание"
                          name="description"
                        />
                    </Field>

                    <Field>
                        <Input
                          label="Количество"
                          name="quantity"
                        />
                    </Field>

                    <Field>
                        <Input
                          label="Артикул"
                          name="vendor_code"
                        />
                    </Field>

                    <Field>
                        <InputDate name="repair_date" label="На дату" />
                    </Field>


                    <Field>
                        <Select
                            name="store_id"
                            label="Склад"
                        >
                            {Object.keys(objects).map((id) => {
                                if (objects[id].kind == "store") {
                                    return <Option key={id} value={id}>{objects[id].name}</Option>
                                }
                            })}
                        </Select>
                    </Field>



                    <SubmitButton>
                        <Button
                            text="Сохранить"
                            className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
                            type="button"
                            onClick={() => {
                                //this.props.removeModalItem(this.props.itemkey)
                                //this.props.fetchData()
                            }}
                            style={{width: '140px', marginTop: '20px'}}
                        />
                    </SubmitButton>
                </Form>
            </div>

        )
    }

}

export default withDictsData(SparesAddForm, { storeAlias: "spares" });