import React, {useContext, useState} from "react";
import "../Confirm.less";
import AppContext from "@/components/app/AppContext";
import Confirm from "../Confirm";

export const ConfirmContext = React.createContext({});

export const ConfirmProvider = ({children}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState({});

  const open = ({body, title, callback}) => {
    setIsOpen(true);
    setParams({body, title, callback});
  }

  const close = () => {
    setIsOpen(false);
    setParams({});
  }

  const onConfirm = () => {
    close();
    params.callback(true);
  };

  const onDismiss = () => {
    close();
    params.callback(false);
  };


  return (
    <ConfirmContext.Provider value={{open}}>
      <Confirm
        isOpen={isOpen}
        title={params?.title}
        message={params?.body}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
    </ConfirmContext.Provider>
  );
}

// if (typeof props.approveCallback == "undefined") {
//   return <ConfirmNotice closeConfirm={close} posTop={posTop} posLeft={posLeft} {...props}/>
// }
//console.log(props);

//   return (
//     <div
//       className={props.isOpen ? "confirm active" : "confirm"}
//       style={{
//         top: `${posTop}px`,
//         left: `${posLeft}px`,
//       }}
//     >
//       <p className="confirm__title">
//         <BookmarkBorderIcon style={{position: 'relative', top: '6px', marginRight: '8px'}}/>
//         Подтвердить действие:
//       </p>
//       {props.content}
//       <div className="confirm__button-panel">
//         <Button
//           label="Отменить"
//           style={{width: "120px"}}
//           onClick={close}
//         />
//         <Button
//           label="Подтвердить"
//           style={{width: "150px"}}
//           onClick={() => {
//
//             if (typeof props.approveCallback == "function") {
//               props.approveCallback(props.callbackData);
//             }
//
//             close();
//           }}
//         />
//       </div>
//     </div>
//   )
// }
