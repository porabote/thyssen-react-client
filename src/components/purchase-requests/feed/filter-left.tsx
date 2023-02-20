import React, {useState, useEffect} from "react";
//import { useAppSelector } from "@/app/hooks/hooks";
import { Form, Field, Select, Input, Button } from "@/app/form";
import { ModelDataSource } from "@/app/DataSources";
import Departments from "@/components/departments/models/Departments";
import Contractors from "../../contractors/models/Contractors";
import DateSource from "@/app/calendar/date-source";

const FilterLeft = () => {

  let weeksList = DateSource.getWeeksList();
  useEffect(() => {
  }, []);

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="object_id"
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

      {/*<Field>*/}
      {/*  <Select*/}
      {/*    name="contractor_id"*/}
      {/*    label="Поставщик:"*/}
      {/*    setData={async () => {*/}
      {/*      return await ModelDataSource({*/}
      {/*        model: Contractors,*/}
      {/*        constraints: {*/}
      {/*          //where: { label: "object" }*/}
      {/*        },*/}
      {/*        //dataPath: "data.0.data",*/}
      {/*      });*/}
      {/*    }}*/}
      {/*    optionValueKey="id"*/}
      {/*    optionTitle={(record) => `${record.attributes.name}`}*/}
      {/*  />*/}
      {/*</Field>*/}

      {/*<Field>*/}
      {/*  <Select*/}
      {/*    name="week_id"*/}
      {/*    label="Неделя:"*/}
      {/*    setData={() => DateSource.getWeeksList()}*/}
      {/*    optionValueKey="number"*/}
      {/*    optionTitle={(record) => `${record.attributes.name}`}*/}
      {/*  />*/}
      {/*</Field>*/}

    </React.Fragment>
  );

}

export default FilterLeft;
