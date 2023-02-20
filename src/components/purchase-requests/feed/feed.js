import React from "react";
import moment from "moment";
import { ButtonLazyLoad, Form } from "@/app/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left.tsx";
//import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";

import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "@components/feed/feed-preloader";
import PurchaseRequests from "../models/PurchaseRequests";

const Feed = (props) => {

  const {
    title,
    filter,
    data,
    meta
  } = useAppSelector(state => state.purchase_requests);

  const submitForm = (values) => {
    props.fetchData();
  };

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }

  return (

    <Form
      entity={PurchaseRequests.createEntity({})}
    >
      <div className="content feed">

        <div className="content__top-filter">
          {/* <FilterTop dicts={props.dicts}/> */}
        </div>

        <div className="content-title">
          <MenuIcon style={{
            color: "#999",
            marginRight: "11px",
            fontSize: "16px"
          }}/>
          {title}
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          {/* <FeedTopPanel */}
          {/*   dicts={props.dicts} */}
          {/*   fetchData={props.fetchData} */}
          {/*   addRecord={props.addRecord} */}
          {/* /> */}
        </div>

        <div className="content__body">

          <Grid grid-template-columns="100px 200px 250px 250px 170px 300px 200px">

            <div className="head">
              <div>
                Номер
                <sup className="grid_list__item sup">Nomer</sup>
              </div>
              <div>
                Объект/PSP элемент
                <sup className="grid_list__item sup">Object/PSP</sup>
              </div>
              <div>
                Инициатор/Отдел
                <sup className="grid_list__item sup">Initiator/PSP</sup>
              </div>
              <div>
                Ожидается подпись/Отдел
                <sup className="grid_list__item sup">Sign expected/Department</sup>
              </div>
              <div>
                Статус
                <sup className="grid_list__item sup">Status</sup>
              </div>
              <div>
                Общий комментарий
                <sup className="grid_list__item sup">General comment</sup>
              </div>
              <div>
                Добавлено/Срочность
                <sup className="grid_list__item sup">Added/Urgency</sup>
              </div>
            </div>


            {data.map((record, index) => {

              const recordData = record.attributes;
              const {
                status,
                initator,
                contractor,
                user,
                object,
              } = record.relationships;

              const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

              return (
                <a linkTo={`/purchase-request/view/${recordData.id}`} key={index}>
                  <div>{recordData.id}</div>
                  <div>
                    <b>{object && object.attributes.name}</b><br></br>
                    {Array.isArray(data_json) && data_json.map(item => {
                      return <p>{item.summa}</p>
                    })}
                  </div>
                  <div>{recordData.name}</div>
                  <div>{recordData.name}</div>
                  <div>{recordData.name}</div>
                  <div>{recordData.name}</div>
                  <div>{recordData.name}</div>
                </a>
              );
            })
            }
          </Grid>
          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
        </div>
      </div>
    </Form>
  );
};

export default Feed;
