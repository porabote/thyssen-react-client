import React, {useState, useEffect} from "react";
import {ModelDataSource} from "@/app/DataSources";
import {Form, Field, Select, Input, Button} from "@/app/form";
import ApiUsers from "@/components/users/Models/ApiUsers";
import AccessListsUsers from "@/components/access-lists/models/AccessListsUsers";
import Entity, {IEntity} from "../../../app/models/entity";

type PickedListProps = {
  entity_id: number;
  event_ids: number[];
};

const PickedListAddForm = (props: PickedListProps) => {

  const setEntity = () => {
    return AccessListsUsers.createEntity({
      user_ids: [],
      access_list_id: props.entity_id,
    });
  };


  // useEffect(() => {
  //   getEntity();
  // }, []);

  // const fetchUsers = async () => {
  //   let users = await new AccessListsUsers()
  //     .setWhere({access_list_id: props.entity_id})
  //     .get();
  //
  // }


  //if (users.length == 0) return <p>Данные загружаются...</p>;

  const onSubmit = (entity: IEntity) => {
    let attributes = entity.getAttributes();

    let records: IEntity[] = [];
    attributes.user_ids.map((user_id: number) => {
      let newRecord: IEntity = AccessListsUsers.createEntity( {
        user_id: user_id,
        access_list_id: props.entity_id,
      });
      records.push(newRecord);
    });

    AccessListsUsers.save(records);
  }

  return (
    <div>
      <Form
        setEntity={setEntity}
        onSubmit={onSubmit}
      >
        <Field>
          <Select
            name="user_ids"
            label="Пользователи"
            isMiltiple={true}
            optionValueKey="id"
            optionTitle={(record: { attributes: { name: string, post_name: string } }) => {
              return `${record.attributes.name} - ${record.attributes.post_name}`
            }}
            setData={async () => {
              let records = await new ApiUsers().setLimit(10000).get();
              return records.data;
            }}
            setTagTitle={(tagValue: number, dataStorage: any[], dataStorageMap: any[]) => {
              let dataIndex = dataStorageMap[tagValue];
              let record = dataStorage[dataIndex];

              return (`${record.attributes.name} (${record.attributes.post_name})`)
            }}
          />
        </Field>

        <div className="buttons-panel">
          <Field>
            <Button
              text="Сохранить"
              className="on-button grey-stroke_x_yellow-fill icon-login-auth__grey_x_white"
              type="button"
              style={{width: "140px", marginTop: "20px"}}
            />
          </Field>
        </div>
      </Form>
    </div>
  );


}

export default PickedListAddForm;
