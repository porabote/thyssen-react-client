import React from 'react';

const TextEditorArea = (props) => {

  let value = props.formContext.values[props.name];

  return (
    <div>
      <label className="comments__form__input-couple__textarea__label"></label>

        <div
          ref={props.textAreaRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          name="msg"
          placeholder="Напишите ваш комментарий"
          className="text-editor-area"
          dangerouslySetInnerHTML={{__html: value}}
          // onInput={(e) => {
          //   this.setState({
          //     values: {
          //       ...values,
          //       msg: e.target.innerHTML
          //     }
          //   })
          // }}
        >
        </div>

    </div>
  );
};

export default TextEditorArea;