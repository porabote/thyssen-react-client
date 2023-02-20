import React, { useEffect, useState } from "react";
//import { Field, InputBare } from "porabote/form";
import { Field, InputBare } from "@/app/form";
import SearchIcon from "@material-ui/icons/Search";
import Statuses from "@/components/statuses/models/Statuses";
import FilterTopStatuses from "./filter-top-statuses";
import { ModelDataSource } from "../../../app/DataSources";
import "./feed-top-panel.less";

const FilterTop = (props) => {

  const [statuses, setStatuses] = useState([]);
  let clientId = props.formContext.entity.getAttribute("where.client_id");

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    let statuses = await ModelDataSource({
      model: Statuses,
      constraints: {
        where: { model_alias: "App.Payments" }
      },
    });

    setStatuses(statuses);
  };

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
            placeholder="Поиск по названию"
            type="text"
            name="seekString"
            className="fast-find__item__input"
            onChange={(value, context, params) => {
              console.log(value);
              console.log(context.entity);
            }}
          />
        </Field>
        <div className="fast-find__item__thumbler"></div>
      </div>

      <Field>
        <FilterTopStatuses clientId={clientId} key="filterStatuses" data={statuses}/>
      </Field>

    </>
  );

};

export default FilterTop;
