import React, {useContext} from 'react';
import FormContext, {FormContextInterface} from '../FormContext';

interface FieldInterface {
  formContext: FormContextInterface,
  name: string,
  children: React.ReactElement,
  label: string,
  optionValueKey?: string
  optionsTitle?: any
};

const Field = (props: FieldInterface) => {

  let context = useContext(FormContext);

  const key = props.children.props.name;

  let value = context.entity!.getAttribute(props.children.props.name);

  return React.cloneElement(props.children, {
    key,
    value,
    props,
    formContext: context,
  });

}

export default Field;
