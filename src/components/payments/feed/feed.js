import React, { useState } from "react";
import moment from "moment";
import { ButtonLazyLoad, Form, Field, Checkbox, Button } from "@/app/form";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left.tsx";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "@components/feed/feed-preloader";
import Payments from "../models/Payments";
import { updateFeedFilters } from "../redux-store/actions";
import PreviewSendPayments from "./dialogs/preview-send-payments";
import { modalActions } from "@app/modal";
import Api from "@/services";

const Feed = (props) => {

  const {
    title,
    filter,
    data,
    meta
  } = useAppSelector(state => state.payments);

  // const submitForm = (values) => {
  //   props.fetchData();
  // };

  // if (!props.isDictsLoaded) {
  //   return <FeedPreloader title={title}/>;
  // }

  const save = (entity) => {
    //console.log(entity.attributes);
    updateFeedFilters(entity.attributes);
  };

  return (

    <Form
      setEntity={() => Payments.createEntity({ ...filter, checkbox_check_all: 0 })}
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
          {/* <FeedTopPanel */}
          {/*   dicts={props.dicts} */}
          {/*   fetchData={props.fetchData} */}
          {/*   addRecord={props.addRecord} */}
          {/* /> */}
        </div>

        <div className="content__body">


          <div className="buttons-panel">
            <Field>
              <Button
                label="Просмотр и отправка"
                onClick={(props) => {
                  modalActions.pushItemToModal(
                    <PreviewSendPayments
                      title="Просмотр и отправка платежей."
                      payments_ids={props.formContext.entity.attributes.index_records_ids}
                    />,
                  );
                }}
              />
            </Field>
            <Field>
              <Button
                label="Просмотреть выбранное"
                onClick={(props) => {
                  console.log(props);
                }}
              />
            </Field>

            <Field>
              <Button
                label="Скачать скан-копии"
                onClick={(props) => {
                  console.log(props);
                }}
              />
            </Field>

            <Field>
              <Button
                label="Назначить GUIDS"
                onClick={(props) => {
                  Api.get("/api/GuidsSchneider/method/assignContractors/");
                }}
              />
            </Field>

          </div>

          <Grid grid-template-columns="50px 90px 200px 180px 200px 270px 170px 220px 220px">

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
                <sup className="grid_list__item sup">Check</sup>
              </div>
              <div>
                Акцепт/Id
                <sup className="grid_list__item sup">Accept/Id</sup>
              </div>
              <div>
                Номер/Скан счёта
                <sup className="grid_list__item sup">Number/Bills scan copy</sup>
              </div>
              <div>
                Статус/Дата оплаты
                <sup className="grid_list__item sup">Status/Date of payment</sup>
              </div>
              <div>
                Объект/PSP
                <sup className="grid_list__item sup">Object/PSP</sup>
              </div>
              <div>
                Плательщик/Поставщик
                <sup className="grid_list__item sup">Zahler/Der Zulieferer</sup>
              </div>
              <div>
                Сумма/Вид (%) оплаты
                <sup className="grid_list__item sup">Sum/Type/Pr. payment</sup>
              </div>
              <div>
                Предмет счёта/Примечание
                <sup className="grid_list__item sup">Gegenstand der Rechnung/Anmerkungen</sup>
              </div>
              <div>
                Назначение платежа
                <sup className="grid_list__item sup">Zahlungszweck</sup>
              </div>
            </div>

            {data.map((record, index) => {

              const recordData = record.attributes;
              const {
                bill,
                status,
                client,
                object,
                contractor
              } = record.relationships;

              const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

              return (
                <div linkTo={`/payments/view/${recordData.id}`} key={recordData.id}>
                  <div>
                    <Field>
                      <Checkbox name={`index_records_ids.${recordData.id}`}/>
                    </Field>
                  </div>
                  <div>
                    <Field>
                      <Checkbox
                        checked={recordData.acceptor_id ? true : false}
                        name={`accepted.${recordData.id}`}
                        onSelect={(status) => {
                          Payments.setAccept(recordData.id, status);
                        }}
                      />
                    </Field>
                    {recordData.id}
                  </div>
                  <div>
                    {bill.attributes &&
                      <span><b>{bill.attributes.number}</b>
                      <br></br>от {moment(bill.attributes.date)
                          .format("DD.MM.Y")}</span>
                    }
                    {bill && bill.attributes.file_of_bill &&
                      <a className="grid_list__icon link-arrow-blank left" target="blank"
                         href={`https://thyssen24.ru/payments/getScansAsPdf/${record.id}/`}>Скан
                        PDF</a>
                    }
                  </div>
                  <div>
                    {status.attributes &&
                      <span><b>{status.attributes.name}</b><br></br>
                      <i>план {moment(recordData.date_payment)
                        .format("DD.MM.Y")}</i></span>
                    }
                  </div>
                  <div>
                    <b>{object.attributes && object.attributes.name}</b><br></br>
                    {Array.isArray(data_json) && data_json.map((item, index) => {
                      return <p key={index}>{item.summa} | {item.psp}</p>;
                    })}
                  </div>
                  <div>
                    <b>{client.attributes && client.attributes.name}</b><br></br>
                    {contractor.attributes && contractor.attributes.name}
                  </div>
                  <div>
                    <b>{recordData.summa} <u>{recordData.currency}</u></b><br></br>
                    <i>{recordData.pay_type} ({recordData.percent_of_bill}%)</i>
                  </div>
                  <div>
                    {bill.attributes.comment}<br></br>
                    <i>{recordData.comment}</i>
                  </div>
                  <div>{recordData.purpose}</div>
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
