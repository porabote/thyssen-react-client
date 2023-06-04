import React, { useEffect, useState } from "react";
//import { Field, InputBare } from "porabote/form";
import { Field, InputBare } from "@/app/form";
import SearchIcon from "@material-ui/icons/Search";
import Statuses from "@/components/statuses/models/Statuses";
import { ModelDataSource } from "../../../app/DataSources";
import "./top-panel.less";

const FilterTop = (props) => {

  return (
    <>
      <div className="fast-find__item">
        <SearchIcon style={{
          color: "#888",
          fontSize: 22,
          padding: "4px 8px"
        }}/>
        <Field>
          <InputBare
            placeholder="Поиск по инн"
            type="text"
            name="orWhereGrouped.0.inn.value"
            className="fast-find__item__input"
            onChange={(newValue, formContext, params) => {
              formContext.setAttribute("orWhereGrouped.0.name.value", newValue);
              formContext.submit();
            }}
          />
        </Field>
        <div className="fast-find__item__thumbler"></div>
      </div>

    </>
  );

};

export default FilterTop;
