import React, {useState} from 'react';
import {Form, Field, Textarea, InputBare, Button} from '/app/form';
import AlternateEmailOutlinedIcon from '@material-ui/icons/AlternateEmailOutlined';
import CommentsModel from "./models/Comments";

const CommentForm = (props) => {

  const [isSubmitReady, setIsSubmitReady] = useState(true);
  const [textAreaHeight, setTextAreaHeight] = useState(110);


  // textariaId: Math.random(),

  // auth: props.auth,
  // values: {
  //     record_id: props.recordId,
  //     class_name: props.modelAlias,
  //     msg: '',
  //     name: props.auth.user.name
  // }


  const sendComment = (formContext) => {

    setIsSubmitReady(true);

    // const values = {
    //     ...formContext.values,
    //     msg: textaria.current.innerHTML
    // }

    // formContext.setFieldValue("msg", "");
    // textaria.current.innerHTML = "";
    //
    // return values;
  }


  const textariaId = Math.random();

  return (
    <Form
      setEntity={() => CommentsModel.createEntity({})}
      beforeSubmit={sendComment}
      submitFormAfter={(response, formContext) => {
          setIsSubmitReady(true);

        formContext.setAttribute('msg', '')
        //props.fetchRecord()

      }}
    >
      <div className="comments__form">

        <div className="comments__form__input-couple__wrap">

          <label className="comments__form__input-couple__item__label first">
            <Field>
              <InputBare
                name="name"
                readOnly=""
                onChange={() => {}}
                placeholder="Ваше имя"
                className="comments__form__input-couple__item first"
              />
            </Field>
          </label>

          <label
            className="comments__form__input-couple__textarea__label"
            style={{height: `${textAreaHeight}px`}}
          >

            <div
              // ref={textaria}
              contentEditable={true}
              suppressContentEditableWarning={true}
              placeholder="Напишите ваш комментарий"
              className="comments__form__input-couple__item div"
            >
            </div>

          </label>

        </div>


        <div className="comments__form__button-panel">

          <Field>
            <Button
              type="submit"
              disabled={isSubmitReady ? false : true}
              className="comments__form__button-panel__button send"
              onClick={(e) => {

                e.preventDefault();

                setState({
                  isSubmitReady: false
                })
              }}
            >
              Отправить
            </Button>
          </Field>
          <AlternateEmailOutlinedIcon
            className="link_with_icon grey"
            style={{
              marginRight: '6px',
            }}
            onClick={(e) => {
              props.openObserversList(
                props.recordId,
                props.businessEventIds,
                props.auth.state,
              );
            }}
          />
        </div>
      </div>
    </Form>
  );

}

export default CommentForm;
// const mapStateToProps = (state) => {
//     return ({
//         auth: auth,
//     })
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         openObserversList: (recordId, businessEventIds, auth) => dispatch({
//             type: 'PUSH_MODAL_ITEM',
//             payload: {
//                 title: `Список оповещений`,
//                 content: React.createElement(ObserversByRecord, {
//                     recordId,
//                     businessEventIds,
//                     auth
//                 })
//             }
//         }),
//     }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
