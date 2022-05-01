import React, {useState} from "react";
import {Form, Field, InputBare} from "porabote/form";
import DialogsContainer from "./dialogs-container";

const Dialogs = (props) => {

  return (
    <div className="dialogs">

      <Form values={{user_id: ''}}>

        <div className="dialogs-user-search-wrap">
          <Field>
            <InputBare
              name="user_id"
              className="dialogs-user-search-input"
              placeholder="Поиск"
              onKeyUp={props.searchByUsersList}
            />
          </Field>

          <div className="dialogs-user-search__drop-panel">
            {props.usersList.map((item, index) => {

              let { id, name, post_name } = item.attributes;
              return (
                <div
                  onClick={(e) => {
                    props.setActiveDialog(id);
                  }}
                  key={index}
                  className="dialogs-user-search__drop-panel__item"
                >
                  <p>{name}</p>
                  <p className="dialogs-user-search__drop-panel__item__sub">
                    {post_name}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </Form>

      {props.dialogs.map((item, index) => {
        return (
          <div key={index} className="dialogs-item">{item.name}</div>
        )
      })}
    </div>
  )

}

export default Dialogs;