import React from 'react'

const Input = props => {

    const inputType = props.type || 'text'
    const inputClass = props.class || 'form_item__text'

    const htmlFor = `${inputType}-${Math.random()}`

    const onChangeDefault = (props) => {
        console.log(this);
    }

    const onChange = props.onChange || onChangeDefault

    return (
        <div className="form_item">
            <label htmlFor={htmlFor} className="form_item__label">{props.label}</label>
            <div className="form_item__input_wrap">
                <input
                    type={inputType}
                    placeholder={props.placeholder}
                    id={htmlFor}
                    name={props.name}
                    onChange={onChange}
                    className={inputClass}
                    autoComplete="off"
                    {...props}
                />
            </div>
        </div>
    )

}

export default Input