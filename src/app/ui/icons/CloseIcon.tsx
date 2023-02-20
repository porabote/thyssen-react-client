import React from "react";
import defaultStyle from "./default-style";

const CloseIcon = (props: {style: {}}) => {

  let style = Object.assign(
    {...defaultStyle},
    props.style || {}
  );

  return (
    <svg className="svg-icon"
         style={style}
         viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M777.856 280.192l-33.92-33.952-231.872 231.872-231.84-231.872-33.984 33.888 231.872 231.904-231.84 231.84 33.888 33.984 231.904-231.904 231.84 231.872 33.952-33.888-231.872-231.904z"/>
    </svg>
  );
}

export default CloseIcon;
