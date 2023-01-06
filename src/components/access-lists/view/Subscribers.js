import React, {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import AddObserver from '@components/observers/add-observer-form';
import AddIcon from '@material-ui/icons/Add';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {StripedList, StripedListRow, StripedListCell} from 'porabote/striped-list';
import AccessListsUsers from "../models/AccessListsUsers";
import {modalActions} from "@/app/Modal"

const Subscribers = props => {

  let {user} = useSelector(state => state.auth);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    let data = await AccessListsUsers
      .setWhere({
        access_list_id: props.data.id,
        account_id: user.account_id
      })
      .setWith([
        'api_user'
      ])
      .get();

    setData(data.data);
    setIsLoading(false);
  }

  // fetchRecord = () => {
  //
  //   setState({
  //     loading: true
  //   })
  //
  //   Api.get(`/api/observers/get/`, {
  //     query: {
  //       include: [ 'user', 'event' ],
  //       whereIn: {
  //         'business_event_id': props.businessEventIds
  //       },
  //       where: {
  //         'entity_id': props.recordId
  //       }
  //     }
  //   }).then((data) => {
  //     setState({
  //       data: (typeof data.data !== 'undefined') ? data.data : [],
  //       loading: false
  //     })
  //   })
  // }

  // unsubscribe = (params = {entity_id, event_ids, user_ids}) => {
  //
  //   Api.get(`/api/observers/method/unsubscribe/`, {
  //     query: params
  //   }).then((data) => {
  //     fetchRecord()
  //   })
  // }

  // selfSubscribe = () => {
  //   Api.get(
  //     `/api/observers/method/subscribe/`,
  //     {
  //       query: {
  //         user_ids: [props.auth.user.id],
  //         event_ids: props.businessEventIds,
  //         entity_id: props.recordId,
  //       },
  //     }
  //   ).then((data) => {
  //     fetchRecord();
  //   })
  // }

  const openAddModal = () => {
    modalActions.pushItemToModal(
      <AddObserver
        // entity_id={props.recordId}
        // event_ids={props.businessEventIds}
        // fetchRecord={fetchRecord}
      />,
      'Добавить наблюдателя',
    );
  }

  if (isLoading) return <div className="empty-data">Данные загружаются</div>

  return (
    <div>
      <div className="links_with_icon__wrap">

        <div
          className="link_with_icon"
          onClick={openAddModal}
        >
          <AddIcon style={{marginRight: '3px'}}/>
          Добавить наблюдателя
        </div>

      </div>

      <StripedList style={{gridTemplateColumns: '450px 1fr'}}>
        {data.map((node, index) => {

          const {api_user} = node.relationships;

          return (
            <StripedListRow key={index}>
              <StripedListCell>
                {api_user.attributes.name}
              </StripedListCell>
              <StripedListCell className="grid_list__item center">
                <RemoveCircleIcon
                  className="link_with_icon grey"
                  onClick={(e) => AccessListsUsers.delete(node.id)}
                />
              </StripedListCell>
            </StripedListRow>
          )
        })}
      </StripedList>
    </div>
  );
}

export default Subscribers;
