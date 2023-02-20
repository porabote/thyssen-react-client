import React, {useRef} from 'react';
import TextEditorPanel from "./text-editor-panel";
import TextEditorArea from "./text-editor-area";
import "./style.less";

const TextEditor = (props) => {

  let textAreaRef = useRef(null);

  return (
    <div className="text-editor">
      <TextEditorPanel textAreaRef={textAreaRef} name={props.name} formContext={props.formContext}/>
      <TextEditorArea textAreaRef={textAreaRef} name={props.name} formContext={props.formContext}/>
    </div>
  );
};

export default TextEditor;