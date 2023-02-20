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
    formContext.submit();
  }

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.object_id"
          label="Объект:"
          setData={async () => {
            return await ModelDataSource({
              model: Departments,
              constraints: {
                where: { label: "object" }
              },
              //dataPath: "data.0.data",
            });
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.contractor_id"
          label="Поставщик:"
          setData={async () => {
            return await ModelDataSource({
              model: Contractors,
              constraints: {
                //where: { label: "object" }
              },
              //dataPath: "data.0.data",
            });
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.client_id"
          label="Плательщик:"
          setData={async () => {
            return await ModelDataSource({
              model: Contractors,
              constraints: {
                where: { type: "self" },
                whereNotNull: [],
              },
            });
          }}
          optionValueKey="id"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

      <Field>
        <InputDate name="whereBetween.date_payment.value.0" onSelect={onSelect} label="В плане оплат с"/>
      </Field>
      <Field>
        <InputDate name="whereBetween.date_payment.value.1" onSelect={onSelect} label="В плане оплат по"/>
      </Field>

      <Field>
        <Select
          onSelect={onSelect}
          name="where.week_id"
          label="Неделя:"
          setData={() => DateSource.getWeeksList()}
          optionValueKey="number"
          optionTitle={(record) => `${record.attributes.name}`}
        />
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;
