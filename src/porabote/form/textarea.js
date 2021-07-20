const Textarea = props => {

    const inputClass = props.class || 'form_item_textarea'

    return (
        <div className="form-item grid">
            <label className="form_item__label">{props.label}</label>
            <div className="form_item_textarea_wrap">
                <textarea
                    type="text"
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={(e) => {
                        props.setFieldValue(props.name, e.target.value)
                    }}
                    className={inputClass}
                    defaultValue={props.values[props.name]}
                >
                </textarea>
            </div>
        </div>
    )

}