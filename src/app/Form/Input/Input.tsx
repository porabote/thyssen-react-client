import React, {ChangeEvent, useState} from 'react';
import {FormContextInterface} from "../FormContext";

interface InputProps {
  formContext: FormContextInterface;
  name: string | undefined;
  label: string | undefined;
  type: string | undefined;
  placeholder: string | undefined;
  disabled: (formContext: FormContextInterface) => any;
  mask: (value: any) => any;
  class: string | undefined;
  value: string | number;
}

const Input = (props: InputProps) => {

  const [value, setValue] = useState(props.value || "");
  const [name, setName] = useState(props.name || "");

  const inputType = props.type || 'text';
  const htmlFor = `${inputType}-${Math.random()}`;

  let label = (typeof props.label != "undefined") ?
    <label htmlFor={htmlFor} className="form_item__label">{props.label}</label> : "";

  let disabled = false;
  if (typeof props.disabled === "function") {
    disabled = props.disabled(props.formContext);
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    setValue(newValue);
    // TODO MASK
    if (typeof props.mask == "function") {
      //value = props.mask(value);
    }

    if (props.formContext.entity && name) {
      props.formContext.entity.setAttribute(name, newValue);
    }
  }

  return (
    <div className="form_item">
      {label}
      <div className="form_item__input_wrap">
        <input
          type={inputType}
          placeholder={props.placeholder}
          id={htmlFor}
          name={name}
          value={value}
          disabled={disabled}
          className={props.class || 'form_item__text'}
          autoComplete="off"
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
};

export default Input;
