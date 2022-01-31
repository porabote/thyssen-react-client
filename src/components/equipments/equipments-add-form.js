import React, { Component } from "react";
import {
  Form,
  Button,
  Field,
  Input,
  InputDate,
  InputHidden,
  Option,
  Select,
  SubmitButton
} from "porabote/form";
import { withDictsData } from "@hocs";

class EquipmentsAddForm extends Component {

  render() {

    const {
      objects,
      organizations_own,
      platforms,
      equipments_types,
    } = this.props.dicts;

    let values = this.props.record || {
      id: null,
      name: '',
      factory_number: null,
      inventory_number: null,
      sap_number: null,
      vin_code: null,
      gos_number: null,
      release_date: null,
      operation_start: null,
      operation_end: null,
      type_id: null,
      organizations_own_id: 1,
      object_id: '',
      platform_id: '',
    };

    return (
      <div>

        <Form
          values={values}
          action="/api/equipments/add/"
          submitFormAfter={(resp) => {
            this.props.removeModalItem(this.props.itemkey);

            // If it edition
            if (typeof this.props.getRecord == "function") {
              this.props.getRecord();
            }
            // If it adding
            if (typeof this.props.fetchRecord == "function") {
              this.props.fetchData();
            }
          }}
        >

          <Field>
            <Select name="organizations_own_id" label="Организация" empty={false}>
              {Object.entries(organizations_own).map((item, index) => {
                let itemData = item[1];
                return <Option key={index} value={itemData.id}>{itemData.name}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Select name="platform_id" label="Площадка">
              {Object.entries(platforms).map((item, index) => {
                let itemData = item[1];
                return <Option key={itemData.id} value={itemData.id}>{itemData.ru_alias}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Select name="object_id" label="Объект">
              {Object.entries(objects).map((item, index) => {
                let itemData = item[1];
                return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Input name="sap_number" label="SAP №"/>
          </Field>

          <Field>
            <Select name="type_id" label="Категория">
              {Object.entries(equipments_types).map((item, index) => {
                let itemData = item[1];
                return <Option key={itemData.id} value={itemData.id}>{itemData.name}</Option>;
              })}
            </Select>
          </Field>

          <Field>
            <Input name="name" label="Наименование оборудования"/>
          </Field>
          <Field>
            <Input name="brand_name" label="Обозначение (тип, марка)"/>
          </Field>
          <Field>
            <Input name="factory_name" label="Завод-изготовитель"/>
          </Field>
          <Field>
            <Input name="vin_code" label="Зав.№ (VIN)"/>
          </Field>
          <Field>
            <Input name="inventory_number" label="Инв. №"/>
          </Field>
          <Field>
            <InputDate name="release_date" label="Дата изготовления"/>
          </Field>
          <Field>
            <InputDate name="operation_start" label="Дата ввода в эксплуатацию"/>
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

export default withDictsData(EquipmentsAddForm, { storeAlias: "equipments" });