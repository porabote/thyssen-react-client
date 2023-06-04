import React, { useState, useEffect } from "react";
import moment from "moment";
import Payments from "../../payments/models/Payments";
import { Form, Field, Select, Input, InputDate, TextArea, Button } from "@app/form";
import { ModelDataSource } from "../../../app/DataSources";
import Dict from "../../dicts/models/Dicts";
import Departments from "../../departments/models/Departments";
import Contractors from "../models/Contractors";
import notifications from "@app/notifications/redux-store/actions";

const EditForm = props => {

  const [record, setRecord] = useState(props.data);

  useEffect(() => {
    getRecord();
  }, []);

  const getRecord = async () => {
    let res = await new Contractors().setWhere({id: props.recordId}).get();
    let record = res.data[0];

    record.attributes.okpo = null;
    setRecord(record);
  }

  const submit = async (entity) => {

    let res = await entity.save();
    //notifications.push(<p>Копия успешно сохранена.</p>);
    props.removeModalItem(0);

  };

  if (!record) return <p>Загрузка данных</p>

  return (
    <div style={{
      maxWidth: "650px",
      margin: "0 auto"
    }}>
      <Form
        model={Contractors}
        initValues={{...record}}
        onSubmit={submit}
      >

        <div className="fieldset" style={{ gridTemplateColumns: "1fr" }}>
          <Field>
            <Input label="Наименование" name="name"/>
          </Field>
        </div>

        <div className="fieldset" style={{ gridTemplateColumns: "50% 50%" }}>

          <Field>
            <Input label="ИНН" name="inn" disabled={true}/>
          </Field>

          <Field>
            <Input label="КПП" name="kpp"/>
          </Field>

          {/*<Field>*/}
          {/*  <Input label="ОКПО" name="okpo" disabled={true}/>*/}
          {/*</Field>*/}

        </div>

        <Field>
          <Button
            style={{
              width: "140px",
              marginTop: "20px"
            }}
          />
        </Field>
      </Form>

    </div>
  );
};

export default EditForm;
