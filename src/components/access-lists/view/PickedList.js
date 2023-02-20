import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PickedListAddForm from "./PickedListAddForm";
import PickedListAttachContractorForm from "./picked-list-attach-contractor-form";
import AddIcon from "@material-ui/icons/Add";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import Grid from "porabote/grid";
import AccessListsUsers from "../models/AccessListsUsers";
import { modalActions } from "@/app/modal";
import AccessListsUsersContractors from "../models/AccessListsUsersContractors";
import AccessListsUsersDefault from "../models/AccessListsUsers";

const PickedList = props => {

  let { user } = useSelector(state => state.auth);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let resp = await new AccessListsUsers()
      .setWith(['contractors.contractor'])
      .setWhere({
        access_list_id: props.data.id,
        account_id: user.account_id,
      })
      .setWith([
        "api_user"
      ])
      .get();

    setData(resp.data);
    setIsLoading(false);
  };

  const openAddModal = () => {
    modalActions.pushItemToModal(
      <PickedListAddForm
        entity_id={props.data.id}
        //event_ids={props.businessEventIds}
      />,
      "Прикрепить пользователя",
    );
  };

  const openAttachContractorModal = (nodeId) => {
    modalActions.pushItemToModal(
      <PickedListAttachContractorForm
        node_id={nodeId}
      />,
      "Закрепить организацию за пользователем",
    );
  };

  // const attachOrganization = (accessId, nodeId) => {
  //   let entity = AccessListsUsersContractors.createEntity({
  //     access_lists_user_id: nodeId,
  //     contractor_id: 2,
  //   });
  //   entity.save();
  // }

  if (isLoading) return <div className="empty-data">Данные загружаются</div>;

  return (
    <div>
      <div className="links_with_icon__wrap">

        <div
          className="link_with_icon"
          onClick={openAddModal}
        >
          <AddIcon style={{ marginRight: "3px" }}/>
          Прикрепить пользователя
        </div>

      </div>

      <Grid grid-template-columns="2fr 1fr 150px">

          <div className="head">
            <div>
              Пользователь
            </div>
            <div>
              Организации
            </div>
            <div>
              Удалить
            </div>
          </div>

          {data.map((node, index) => {

            const { api_user, contractors } = node.relationships;

            return (
              <div key={node.id}>
                <div key={index}>
                  {api_user.attributes.name}
                </div>
                <div>
                  <AddIcon onClick={() => openAttachContractorModal(node.id)} style={{ marginRight: "3px" }}/>
                  {contractors.map((item) => {
                    return <div key={item.id}>{item.relationships.contractor.attributes.name}</div>;
                  })}
                </div>
                <div className="grid_list__item center">
                  <RemoveCircleIcon
                    className="link_with_icon grey"
                    onClick={(e) => AccessListsUsersDefault.delete(node.id)}
                  />
                </div>
              </div>
            );
          })}
      </Grid>
    </div>
);
}

export default PickedList;
