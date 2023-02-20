import React, {useState} from 'react';

const Checkbox = (props) => {

  const [isChecked, setIsChecked] = useState(props.checked || false);
  const [name] = useState(props.name || "");
  const [htmlFor, setHtmlFor] = useState(`checkbox-${Math.random()}`);

  // checked: props.initChecked || false,


    let disabled = props.disabled ? props.disabled : false;

    if (typeof disabled === "function") {
      disabled = disabled(props.value);
    }

    return (
      <div className="form-item__checkbox-wrap">
        <input
          type="checkbox"
          id={htmlFor}
          className={ props.class || 'form-item__checkbox'}
          disabled={disabled}
          name={name}
          value={props.value}
          checked={props.value ? true : false}
          onClick={(e) => {
            let status = (e.target.checked) ? true : false;
            setIsChecked(status);

            props.formContext.setAttribute(props.name, 1);
            if (typeof props.onSelect == "function") {
              props.onSelect(status, props.formContext);
            }

          }}
          onChange={e => {

            // setState({
            //   checked: e.target.checked
            // })

            let status = (e.target.checked) ? 1 : 0

            // if (status) {
            //   props.formContext.setFieldValue(props.name, state.value)
            // } else {
            //   props.formContext.setFieldValue(props.name, '', 'delete')
            // }


            // if (typeof props.onChange === "function") {
            //   props.onChange(e, props.formContext)
            // }

          }}
        />
        <label htmlFor={htmlFor}>{props.label}</label>
      </div>
    )
  }

export default Checkbox;
