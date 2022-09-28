import React from 'react'
import {Field, InputBare} from 'porabote/form'
import SearchIcon from '@material-ui/icons/Search';

const FilterTop = (props) => {

  return (
    <div className="fast-find__item">
      <SearchIcon style={{color: '#888', fontSize: 22, padding: '4px 8px'}}/>
      <Field>
        <InputBare
          placeholder="Поиск по названию"
          type="text"
          name="seekString"
          className="fast-find__item__input"
          onKeyUp={(e, params) => {
            let value = e.target.value;
            params.formContext.setFieldValue('orWhereGrouped.0.name.value', value);
            params.formContext.submitForm();
          }}
        />
      </Field>
      <div className="fast-find__item__thumbler"></div>
    </div>
  );

}

export default FilterTop