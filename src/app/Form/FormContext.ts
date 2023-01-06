import React, { createContext } from "react";
import Entity, {IEntity} from "@/app/Models/Entity";

export interface FormContextInterface {
  entity?: IEntity | null;
  submit: (...args: any[]) => any;
};

const FormContext = createContext<FormContextInterface>({
  entity: null,
  submit: () => {},
});

const { Provider: FormProvider, Consumer: FormConsumer } = FormContext;

export {
  FormProvider,
  FormConsumer
}
export default FormContext;
