import React, { Component } from 'react'
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
import Api from '@services/api-service'

class AddObject extends Component {

  state = {
    values: {
      platform_id: this.props.platformId,
      name: "",
      address: "",
      kind: "self",
    }
  }

  submitForm = (values) => {

    Api.get(
      `/api/objects/method/add/`,
      {
        query: values,
      }
    ).then((data) => {
      //this.props.fetchRecord();
    })
  }

  render() {

    return (
      <div>
        <Form
          values={this.state.values}
          action="/api/objects/method/add/"
          submitForm={this.submitForm}
          submitFormAfter={(resp) => {
            this.props.getRecord()
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
              label="Андес"
              name="address"
            />
          </Field>
          <Field>
            <Select
              name="kind"
              label="Тип"
              empty={false}
            >
              <Option key="self" value="self">Базовый</Option>
              <Option key="store" value="store">Склад</Option>
              <Option key="rent" value="rent">Аренда</Option>
            </Select>
          </Field>

          <SubmitButton>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              onClick={() => {
                this.props.removeModalItem(this.props.itemkey);
                this.props.getRecord();
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default AddObject