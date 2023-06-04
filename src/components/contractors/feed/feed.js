import React, { useState } from "react";
import moment from "moment";
import { ButtonLazyLoad, Form, Field, Checkbox, Button } from "@/app/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Grid from "@/app/grid";
import FilterLeft from "./filter-left.tsx";
import FilterTop from "./filter-top";
import TopPanel from "./top-panel";
import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "@components/feed/feed-preloader";
import { updateFeedFilters } from "../redux-store/actions";
import Icon, { EditIcon, CloneIcon } from "@app/ui/icons";
import Contractors from "../models/Contractors";
import PreviewSendPayments from "../../payments/feed/dialogs/preview-send-payments";
import CloneForm from "../forms/clone-form";
import EditForm from "../forms/edit-form";
import modal from "@app/modal";

const Feed = (props) => {

  const {
    title,
    filter,
    data,
    meta,
    loading,
  } = useAppSelector(state => state.contractors);

  if (loading && !meta.count) {
    return <FeedPreloader title={title}/>;
  }

  const save = (entity) => {
    updateFeedFilters(entity.attributes);
  };

  const openCloneDialog = async (recordId) => {
    modal.open(
      <CloneForm
        title="Клонирование контрагента."
        recordId={recordId}
      />,
    );
  };

  const openEditDialog = async (recordId) => {
    modal.open(
      <EditForm
        title="Редактирование контрагента."
        recordId={recordId}
      />,
    );
  };

  return (

    <Form
      model={Contractors}
      initValues={{
        ...filter,
        checkbox_check_all: 0
      }}
      onSubmit={save}
    >
      <div className="content feed">

        <div className="content__top-filter">
          <Field>
            <FilterTop/>
          </Field>
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
          <TopPanel/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="50px 120px 120px 1fr 200px 50px 50px">

            <div className="head">
              <div>
                <Field>
                  <Checkbox
                    name={`checkbox_check_all`}
                    onSelect={(status, context) => {
                      data.map((item) => {
                        context.setAttribute(`index_records_ids.${item.id}`, status ? 1 : 0);
                        context.setAttribute(`checkbox_check_all`, status ? 1 : 0);
                      });
                    }}
                  />
                </Field>
                <sup className="grid_list__item sup">Все</sup>
              </div>
              <div>
                ИНН
              </div>
              <div>
                КПП
              </div>
              <div>
                Название
              </div>
              <div>
                Источник
              </div>
              {/* <div> */}
              {/*   Дата добавления */}
              {/* </div> */}
              <div>
              </div>
              <div>
              </div>
            </div>

            {data.map((record, index) => {

              const recordData = record.attributes;
              // const {
              //   bill,
              //   status,
              //   client,
              //   object,
              //   contractor
              // } = record.relationships;

              // const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

              return (
                <div
                  key={recordData.id}
                  linkTo={`/contractors/view/${recordData.id}`}
                >
                  <div>
                    <Field>
                      <Checkbox name={`index_records_ids.${recordData.id}`}/>
                    </Field>
                  </div>
                  <div>
                    {recordData.inn}
                  </div>
                  <div>
                    {recordData.kpp}
                  </div>
                  <div>
                    {recordData.name}
                  </div>
                  <div>
                    {recordData.source_type == 1 ? "CredInform" : "Пользователь"}
                  </div>
                  {/* <div> */}
                  {/*   {recordData.created_at} */}
                  {/* </div> */}
                  <div noRoute>
                    <Icon
                      alt="Клонировать"
                      fontSize="small"
                      style={{
                        cursor: "pointer",
                        color: "#d5d5d5",
                      }}
                      onClick={() => openCloneDialog(recordData.id)}
                    >
                      <CloneIcon/>
                    </Icon>
                  </div>
                  <div noRoute>
                    {recordData.source_type == 2 &&
                      <Icon
                        alt="Копировать"
                        onClick={() => openEditDialog(recordData.id)}
                      >
                        <EditIcon/>
                      </Icon>
                    }
                  </div>
                </div>
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
