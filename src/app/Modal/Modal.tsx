import React, {} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {modalActions} from "./";
import ModalTab from './ModalTab';
import ModalItem, {modalItemProps} from './ModalItem';
import './Modal.less';

type modalStateProps = {
    items: modalItemProps[];
    isOpen: boolean;
    activeItemKey: number;
};

const Modal = () => {

  const dispatch = useDispatch();

  let modalState: modalStateProps = useSelector(((state: {modal_ts: modalStateProps}) => state.modal_ts));


  return (
    <div
      className={modalState.isOpen ? "modal active" : "modal"}
      onClick={() => {
        modalActions.closeModal(dispatch);
      }}
    >
      <div
        className={modalState.isOpen ? "modal-box-wrap active" : "modal-box-wrap"}
        onClick={e => {
          e.stopPropagation()
        }}
      >
        <div id="modal-tabs">
          {modalState.items.map((item, index) => {
            return <ModalTab
              title={item.title}
              activeItemKey={modalState.activeItemKey}
              itemkey={index}
              key={item.itemkey}
            />
          })}
        </div>

        {modalState.items.map((item, index) => {
          return <ModalItem
            activeItemKey={modalState.activeItemKey}
            title={item.title}
            content={item.content}
            itemkey={index}
            key={item.itemkey}
          />
        })}

      </div>
    </div>
  );

}

export default Modal;
