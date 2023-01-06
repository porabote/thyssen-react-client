import React from 'react';
import {FormConsumer, FormContextInterface} from '../FormContext';

interface FieldInterface {
  formContext: FormContextInterface,
  name: string,
  children: React.ReactElement,
  label: string,
  optionValueKey?: string
  optionsTitle?: any
};

const Field = (props: FieldInterface) => {

  return (
    <FormConsumer>
      {(formContext: FormContextInterface) => {

        let value = formContext.entity!.getAttribute(props.children.props.name);

        return React.cloneElement(props.children, {
          value,
          ...props,
          formContext,
        })
      }}
    </FormConsumer>
  );
}

export default Field;
