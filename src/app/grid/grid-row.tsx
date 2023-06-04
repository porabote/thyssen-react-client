import React, {Component} from "react";
import {useHistory} from "react-router-dom";
import GridCell from "./grid-cell";

const GridRow = (props) => {

  const history = useHistory();

  const routeTo = (noRoute) => {
    if (!noRoute && props.linkTo) history.push(props.linkTo);
  }

  return (
    <div
      className={typeof props.className == "undefined" ? "grid" : "grid head"}
      style={{gridTemplateColumns: props["grid-template-columns"], cursor: "pointer"}}
    >
      {React.Children.map(props.children, (cell, index) => {
        return <GridCell routeTo={routeTo} {...cell.props} />;
      })}

    </div>
  );


}

export default GridRow
