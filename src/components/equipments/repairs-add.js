import React, { Component } from "react";
import {
  Form,
  Field,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate,
  InputDatePeriod,
  Textarea,
} from 'porabote/form';
import Api from "@services/api-service";

class RepairsAdd extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statuses: {},
      loading: true,
      values: {
        equipment_id: props.record.id,
        date_at: '',
        date_to: '',
        count: '',
      }
    }
  }

  submitForm = (values) => {

    Api.get(
      `/api/equipments-repairs/method/add/`,
      {
        query: values,
      }
    ).then((data) => {
      this.props.getRecord();
    })
  }

  render() {

    return (
      <div>
        <Form
          values={this.state.values}
          submitForm={this.submitForm}
          submitFormAfter={(resp) => {
            //window.location = `/porabote/business-events/view/${resp.data.id}`
            //this.props.fetchRecord()
          }}
        >

          <Field>
            <Select name="type_id" label="Вид ТО\ремонта" empty={false}>
              {[].map((item, index) => {
                let itemData = item[1];
                return <Option key={index} value={itemData.id}>{itemData.name}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Input name="engine_hours" label="Наработка"/>
          </Field>

          <Field>
            <InputDatePeriod name="date" names={[ "date_at", "date_to" ]} label="Период проведения"/>
          </Field>


          <Field>
            <Input name="downtime" label="Время простоя (ч)"/>
          </Field>
          <Field>
            <Textarea name="desc_short" label="Краткое описание" grid="flex"/>
          </Field>

          <Field>
            <Textarea name="desc" label="Описание" grid="flex"/>
          </Field>

          <Field>
            <Select name="spares_ids" label="Запчасти" empty={false}>
              {[].map((item, index) => {
                let itemData = item[1];
                return <Option key={index} value={itemData.id}>{itemData.name}</Option>;
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
              }}
              style={{width: '140px', marginTop: '20px'}}
            />
          </SubmitButton>
        </Form>
      </div>
    )
  }

}

export default RepairsAdd;