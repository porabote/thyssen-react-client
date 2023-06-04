import React, {useState} from 'react';
import "./Confirm.less";

const Confirm = () => {

  const posTop = window.innerHeight / 2 - 100;
  const posLeft = window.innerWidth / 2 - 250;

  const [isOpened, setIsOpened] = useState(true);

  return (
    <div
      style={{
        top: `${posTop}px`,
        left: `${posLeft}px`,
      }}
      className={isOpened ? "prb-confirm active" : "prb-confirm"}
    >
      confirm
    </div>
  );
};

export default Confirm;
