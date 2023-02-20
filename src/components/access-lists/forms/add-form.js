import React, { useState, useEffect } from "react";
import AccessLists from "../models/AccessLists";
import { Form, Field, Select, Input, Button } from "/app/form";
import Entity from "/app/models/entity";
import { ModelDataSource } from "/app/DataSources";
import Dicts from "@/components/dicts/models/Dicts";

const AddForm = props => {

  const setEntity = () => {
    return  AccessLists.createEntity({
      component_id: "",
      name: "",
    });
  };

  return (
    <div>
      <Form
        setEntity={setEntity}
      >

        <div className="fieldset" style={{ gridTemplateColumns: "1fr" }}>

          <Field>
            <Input
              label="Заголовок"
              name="name"
            />
          </Field>

          <Field>
            <Select
              name="component_id"
              label="Компонент"
              setData={async () => {
                return await ModelDataSource({
                  model: Dicts,
                  constraints: {
                    where: { assoc_table: "components" }
                  },
                  dataPath: "data.0.data",
                });
              }}
              optionValueKey="id"
              optionTitle={(record) => `${record.attributes.description}`}
            />
          </Field>
        </div>


        <Field>
          <Button
            style={{width: '140px', marginTop: '20px'}}
          />
        </Field>
      </Form>

    </div>
  );
};

export default AddForm;
