import React from "react";
import defaultStyle from "./default-style";

const DoneIcon = (props: {style: {}}) => {

  let style = Object.assign(
    {...defaultStyle},
    props.style || {}
  );

  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#D9DBDB"/>
      <path d="M11.9793 16.6012C11.4805 17.0856 10.6713 17.0856 10.1728 16.6012L7.37404 13.8831C6.87532 13.399 6.87532 12.6131 7.37404 12.129C7.87252 11.6447 8.68174 11.6447 9.18046 12.129L10.848 13.7483C10.9739 13.8703 11.1782 13.8703 11.3043 13.7483L15.8195 9.36325C16.318 8.87892 17.1272 8.87892 17.626 9.36325C17.8655 9.59584 18 9.91141 18 10.2403C18 10.5692 17.8655 10.8848 17.626 11.1173L11.9793 16.6012Z" fill="white"/>
    </svg>
  );
}

export default DoneIcon;