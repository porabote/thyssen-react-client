import React, {useState} from 'react';
import {FormContextInterface} from "../FormContext";
import "./Button.less";

type buttonProps = {
  label: string;
  className: string;
  icon: string;
  style: {[key: string]: string | number};
  formContext: FormContextInterface;
};

const Button = (props: buttonProps) => {

  const [className, setClassName] = useState(props.className || "prb-button yellow");
  const [label, setLabel] = useState(props.label || "Сохранить");
  const [icon, setIcon] = useState(props.icon || "");
  const [style, setStyle] = useState(props.style || {})

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    if (props.formContext && typeof props.onClick != "function") {
      props.formContext.submit();
    } else {
      props.onClick({...props});
    }
  }

  return (
    <div
      className={className}
      style={{backgroundImage: icon ? `url(${icon})` : "none"}}
      onClick={handleClick}
      style={style}
    >
      {props.children}
      {label}
    </div>
  );
};

export default Button;
