import React, {useEffect} from "react";
import {useSelector} from 'react-redux';

import {
  Form,
  Field,
  Input,
  Option,
  Select,
  Button,
  SubmitButton,
} from "porabote/form";

const AddForm = (props) => {

  const {dicts} = useSelector(state => state.dicts);

  return (
    <Form
      values={{}}
      submitForm={(values) => {
        props.createTicket(values, props.itemkey);
      }}
      submitFormAfter={(resp) => {
        //window.location = `/porabote/business-events/view/${resp.data.id}`
        //this.props.fetchRecord()
      }}
    >

      <div>
        <Field>
          <Input name="comment" label="Описание"/>
        </Field>
      </div>


      <SubmitButton>
        <Button
          text="Сохранить"
          className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
          type="button"
          onClick={() => {

            // this.props.getRecord();
            // this.props.removeModalItem(this.props.itemkey)
          }}
          style={{width: '140px', marginTop: '20px'}}
        />
      </SubmitButton>

    </Form>
  );
}

export default AddForm;