import React from "react";
import {ConfirmContext} from "../ConfirmContext";

const useConfirm = () => {
  const {open} = React.useContext(ConfirmContext);

  const openConfirm = ({...options}) => {
    new Promise((res) => {
      open({ actionCallback: res, ...options });
    })
  }
}
