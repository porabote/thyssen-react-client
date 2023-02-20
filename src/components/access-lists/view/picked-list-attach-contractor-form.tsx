import React, {useState, useEffect} from "react";
import {ModelDataSource} from "@/app/DataSources";
import {Form, Field, Select, Input, Button} from "@/app/form";
import ApiUsers from "@/components/users/Models/ApiUsers";
import AccessListsUsers from "@/components/access-lists/models/AccessListsUsers";
import Entity, {IEntity} from "../../../app/models/entity";
import AccessListsUsersContractors from "../models/AccessListsUsersContractors";
import Contractors from "@/components/contractors/models/Contractors";

type PickedListProps = {
  node_id: number;
};

const PickedListAttachContractorForm = (props: PickedListProps) => {

  const setEntity = () => {
    return AccessListsUsers.createEntity({
      contractors_idx: [],
      node_id: props.node_id,
    });
  };

  const onSubmit = (entity: IEntity) => {
    let attributes = entity.getAttributes();

    let records: IEntity[] = [];
    attributes.contractors_idx.map((contractor_id: number) => {
      let newRecord: IEntity = AccessListsUsersContractors.createEntity( {
        access_lists_user_id: props.node_id,
        contractor_id: contractor_id,
      });
      records.push(newRecord);
    });

    AccessListsUsersContractors.save(records);
  }

  return (
    <div>
      <Form
        setEntity={setEntity}
        onSubmit={onSubmit}
      >
        <Field>
          <Select
            name="contractors_idx"
            label="Организации"
            isMiltiple={true}
            optionValueKey="id"
            optionTitle={(record: { attributes: { name: string } }) => {
              return `${record.attributes.name}`
            }}
            setData={async () => {
              return await ModelDataSource({
                model: Contractors,
                constraints: {
                  where: {
                    type: "self",
                  }
                },
                limit: 5000,
              });
            }}
            setTagTitle={(tagValue: number, dataStorage: any[], dataStorageMap: any[]) => {
              let dataIndex = dataStorageMap[tagValue];
              let record = dataStorage[dataIndex];

              return record.attributes.name;
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

export default PickedListAttachContractorForm;
