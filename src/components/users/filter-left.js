import React from "react";
import { useSelector } from "react-redux";
import { withDictsData } from '@hocs'
import { Field, Select, Option } from 'porabote/form'
import DateTime from 'porabote/date-time'

const FilterLeft = () => {

  const { departments } = useSelector(state => state.dicts.dicts);
  const statuses = {
    invited: 'Приглашён',
    active: 'Активен',
    fired: 'Уволен',
  }

  return (

    <React.Fragment>
      <div className="content__filter__left__title">Фильтр</div>

      <Field>
        <Select
          name="where.department_id"
          label="Департамент"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(departments).map((id) => {
              return <Option key={id} value={id}>{departments[id].name}</Option>
          })}
        </Select>
      </Field>

      <Field>
        <Select
          name="where.status"
          label="Статус"
          afterSelectCallback={(event, formContext) => {
            formContext.submitForm()
          }}
        >
          {Object.keys(statuses).map((alias) => {
            return <Option key={alias} value={alias}>{statuses[alias]}</Option>
          })}
        </Select>
      </Field>

    </React.Fragment>
  );

}

export default FilterLeft;