import React from 'react';
import {FormProvider} from "./FormContext";
import IModel from "@/app/Models/IModel";
import Entity, {IEntity} from "@/app/Models/Entity";

interface FormProps {
  method: string;
  model: IModel,
  entity: IEntity,
  children: React.ReactNode[],
}

const Form = ({model, entity, children, method = "POST"}: FormProps) => {

  if (!entity) {
    return 'Загружка данных';
  }

  try {

    const submit = () => {
      entity.save();
    }

    return (
      <FormProvider value={{
        entity,
        submit,
      }}>
        <>
          {children}
        </>
      </FormProvider>
    );
  } catch (e) {
    console.log(e);
  }
}

export default Form;
