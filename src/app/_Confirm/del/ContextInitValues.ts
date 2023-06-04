import React, {useContext, useState} from "react";

//Use in AppProvider
const initValues = {
  isShowed: false,
  body: null,//React.FC
  title: null,
  buttonOk: null,
  buttonCancel: null,
};

const [values, setValues] = useState(initValues);
const show = () => {
  setValues({
    ...values,
    isShowed: true,
  });
}

export default {
  ...values,
  show,
};
