import React, {useState, useEffect} from "react";
//import { useAppSelector } from "@/app/hooks/hooks";
import { Field, Select, InputDate } from "@/app/form";
import { ModelDataSource } from "@/app/DataSources";
import Departments from "@/components/departments/models/Departments";
import Contractors from "../../contractors/models/Contractors";
import DateSource from "@/app/calendar/date-source";

const FilterLeft = () => {

  let weeksList = DateSource.getWeeksList();
  useEffect(() => {
  }, []);

  const onSelect = (newValue, formContext, elementProps) => {
   // formContext.setAttribute("where.");
    formContext.submit();
  }

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          emptyTitle="Не выбрано"
          onSelect={onSelect}
          name="where.source_type"
          label="Источник:"
          setData={() => {
            return [
              {
                id: 1,
                name:"Credinform",
              },
              {
                id: 2,
                name:"Пользователь",
              },
            ];
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;
