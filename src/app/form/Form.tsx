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

const Form = ({model, setEntity, children, onSubmit, method = "POST"}: FormProps) => {

  const [entity, setFormEntity] = useState(null);
  const [formKey, setFormKey] = useState(null);

  // const updateFormEntity = (entity) => {console.log(entity.attributes);
  //   setFormEntity(entity);
  // }

  try {

    useEffect(() => {
      let entity = setEntity();
      //entity.updateFormEntity = updateFormEntity;
      setFormEntity(entity);
    }, []);

    const submit = () => {

      if (typeof onSubmit == "function") {
        onSubmit(entity);
      } else {
        entity.save();
      }
    }

    const setAttribute = (attributeName, value) => {
      entity.setAttribute(attributeName, value);
      setFormKey(Math.random() * 1000); // For form rerender
    }

    if (!entity) return <p></p>;

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
