import React, {useEffect, useState} from 'react';
import {FormProvider} from "./FormContext";
import IModel from "../models/i-model";
import Entity, {IEntity} from "../models/entity";
import "./Form.less";

interface FormProps {
  method: string;
  model: IModel,
  entity: IEntity,
  children: React.ReactNode[],
  onSubmit?: (entity: IEntity) => {};
}

const Form = ({model, initValues, setEntity, children, onSubmit, method = "POST"}: FormProps) => {

  const [entity, setFormEntity] = useState(null);
  const [formKey, setFormKey] = useState(null);

  // const updateFormEntity = (entity) => {console.log(entity.attributes);
  //   setFormEntity(entity);
  // }


  try {

    useEffect(() => {
      initEntity();
    }, []);

    const initEntity = async () => {
      let entity;
      if (typeof setEntity == "function") {
        entity = setEntity();
      } else {
        entity = new Entity(model, initValues);
        await entity.loadRecord();
      }

      setFormEntity(entity);
    }

    const submit = () => {

      if (typeof onSubmit == "function") {
        onSubmit(entity);
      } else {
        entity.save();
      }
    }

    const setAttribute = (attributeName, value, mode?: string) => {

      if (!mode) mode = 'merge';

      entity.setAttribute(attributeName, value, mode);
      setFormKey(Math.random() * 1000); // For form rerender
    }

    if (!entity) return <span>Загрузка</span>;

    return (
      <FormProvider value={{
        entity,
        setAttribute,
        // updateFormEntity,
        submit,
      }}>
        {children}
      </FormProvider>
    );
  } catch (e) {
    console.log(e);
  }
}

export default Form;
