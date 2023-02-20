import React from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import {Button} from "porabote/form";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import {closeConfirm} from "./redux-store/actions";
import ConfirmNotice from "./confirm-notice";

const Confirm = () => {

  const dispatch = useDispatch();
  const props = useSelector(state => state.confirm);

  const posTop = window.innerHeight / 2 - 100;
  const posLeft = window.innerWidth / 2 - 250;

  const closeConfirmWindow = () => {
    dispatch(closeConfirm());
  }

  if (typeof props.approveCallback == "undefined") {
    return <ConfirmNotice closeConfirm={closeConfirmWindow} posTop={posTop} posLeft={posLeft} {...props}/>
  }

  return (
    <div
      className={props.isOpen ? "confirm active" : "confirm"}
      style={{
        top: `${posTop}px`,
        left: `${posLeft}px`,
      }}
    >
      <p className="confirm__title">
        <BookmarkBorderIcon style={{position: 'relative', top: '6px', marginRight: '8px'}}/>
        Подтвердить действие:
      </p>
      <p className="confirm__body" dangerouslySetInnerHTML={{__html: props.msg}}>
      </p>
      <div className="confirm__button-panel">
        <Button
          style={{width: "120px"}}
          onClick={closeConfirmWindow}
        >
          Отменить
        </Button>
        <Button
          style={{width: "150px"}}
          onClick={() => {

            if (typeof props.approveCallback == "function") {
              props.approveCallback(props.callbackData);
            }

            closeConfirmWindow();
          }}
        >
          Подтвердить
        </Button>
      </div>
    </div>
  )
}

export default Confirm;
