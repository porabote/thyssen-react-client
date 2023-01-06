import React, { useState, useEffect } from "react";
import AccessLists from "../models/AccessLists";
import { Form, Field, Select, Input, Button } from "@app/Form";
import Entity from "@/app/Models/Entity";
import { ModelDataSource } from "@/app/DataSources";
import Dict from "@/components/dicts/models/Dict";

const AddForm = props => {

  const [entity, setEntity] = useState(null);

  useEffect(() => {
    getEntity();
  }, []);

  const getEntity = async function () {
    let entity = new Entity(new AccessLists(), {
    //  id: 3,
      component_id: 2,
      name: "tanya",
    });
    setEntity(entity);
  };

  return (
    <div>
      <Form
        entity={entity}
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
                  model: Dict,
                  constraints: {
                    where: { assoc_table: "components" }
                  },
                  dataPath: "data.0.data",
                });
              }}
              optionValueKey="id"
              optionTitle="description"
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
