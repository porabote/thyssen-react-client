import React, {useState, useEffect} from 'react';
import moment from "moment";
import { Form, Field, Input, InputDate, Button } from "@/app/form";
import Grid from "porabote/grid";
import Payments from "@/components/payments/models/Payments";
import PaymentsSets from "@/components/payments-sets/models/PaymentsSets";

const PreviewSendPayments = (props) => {

  const [ids] = useState(props.payments_ids || [0]);
  const [payments, setPayments] = useState([]);
  const [usdAmount, setUsdAmount] = useState(0);
  const [eurAmount, seteurAmount] = useState(0);

  useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {

    let idsFiltered = [];
    for(let key in ids) {
      if (ids[key] == 1) idsFiltered.push(key);
    }
    if(idsFiltered.length == 0) idsFiltered.push(0);

    let payments = await new Payments()
      .setWhereIn({id: idsFiltered})
      .setWith(["bill", "status", "client", "object", "contractor"])
      .get();
    setPayments(payments.data);
  }

  const changeRate = async (date, formContext) => {
    let courses = await PaymentsSets.getCourses(moment(date).format("DD.MM.Y"));
    formContext.setAttribute("rate_usd", courses.list.USD.Value);
    formContext.setAttribute("rate_eur", courses.list.EUR.Value);
  }

  return (
    <div>
      <Form
        setEntity={() => {
          return PaymentsSets.createEntity({
            rate_eur: 0,
            rate_usd: 0,
            payments_ids: Object.keys(props.payments_ids || []),
          })
        }}
      >
        <div style={{display: "grid", gridTemplateColumns: "150px 150px 150px", gridGap: "10px"}}>
          <Field>
            <Input type="float" label="Курс EUR" name="rate_eur"/>
          </Field>
          <Field>
            <Input type="float" label="Курс USD" name="rate_usd"/>
          </Field>
          <Field>
            <InputDate label="Курс EUR" onSelect={changeRate} name="date"/>
          </Field>
        </div>

        <div className="form-buttons-panel">
          <Field>
            <Button label="Сохранить пакет и отправить на оплату"/>
          </Field>
        </div>

      </Form>

      <Grid grid-template-columns="190px 220px 200px">
        <div className="head">
          <div>
            Кол-во платежей
          </div>
          <div>
            Итого (EUR)
          </div>
          <div>
            Итого (RUR)
          </div>
        </div>

        <div>
          <div>{payments.length}</div>
          <div>{eurAmount}</div>
          <div>{usdAmount}</div>
        </div>

      </Grid>

      <Grid grid-template-columns="80px 150px 120px 190px 220px 200px 140px 100px">

        <div className="head">
          <div>
            Номер
          </div>
          <div>
            Объект/PSP
          </div>
          <div>
            Дата платежа
          </div>
          <div>
            Счёт Номер/Дата
          </div>
          <div>
            Плательщик/Контрагент
          </div>
          <div>
            Сумма руб./ валюта счёта
          </div>
          <div>
            Назначение
          </div>
          <div>
            Код ВО
          </div>
        </div>

        {payments.map((record, index) => {

          const recordData = record.attributes;
          const data_json = recordData.data_json ? JSON.parse(recordData.data_json).info : [];

          const {
            bill,
            status,
            client,
            object,
            contractor
          } = record.relationships;

          return(
            <div key={record.id}>
              <div>{record.id}</div>
              <div>
                <p><b>{object && object.attributes.name}</b></p>
                {Array.isArray(data_json) && data_json.map((item, index) => {
                  return <p key={index}>{item.summa} | {item.psp}</p>;
                })}
              </div>
              <div>
                <b>{moment(recordData.date_payment).format("DD.MM.Y")}</b>
              </div>
              <div>
                {bill.attributes &&
                  <span><b>{bill.attributes.number}</b>
                      <br></br>от {moment(bill.attributes.date)
                      .format("DD.MM.Y")}</span>
                }
              </div>
              <div>
                <b>{client.attributes && client.attributes.name}</b><br></br>
                {contractor.attributes && contractor.attributes.name}
              </div>
              <div>
                <b>{recordData.summa} / <u>{recordData.currency}</u></b><br></br>
              </div>
              <div>{recordData.purpose}</div>
              <div>{recordData.vo_code}</div>
            </div>
          );
        })}

      </Grid>

    </div>
  );
};

export default PreviewSendPayments;
