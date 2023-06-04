import React, {useState, useEffect} from 'react';
import moment from "moment";
import { API_URL } from "@configs";
import ContractorsCredinform from "@components/contractors/models/ContractorsCredinform";
import { Form, Field, InputBare, Input, InputDate, Button } from "@/app/form";
import Grid from "porabote/grid";
import SearchIcon from "@material-ui/icons/Search";
import Icon, { PlusIcon, PdfIcon } from "@app/ui/icons";
import notify from "@app/notifications";
import {useSelector} from "react-redux";

const CredinformList = (props) => {

  const [ids] = useState(props.payments_ids || [0]);
  const [records, setRecords] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    getRecords();
  }, [searchString]);

  const { user } = useSelector(state => state.auth);

  const getRecords = async () => {

    let records = await new ContractorsCredinform()
      .setQueryParams({inn: searchString})
      .get();

     setRecords(records.data);
  }

  const addContractor = async (e, record) => {console.log(notify);
    try {
      let res = await ContractorsCredinform.save([ContractorsCredinform.createEntity(record)]);
      if(res.error) {
        notify.push(<p>{res.error}</p>, {type: "OK"});
      } else {
        notify.push(<p>Контрагент успешно добавлен</p>, {type: "OK"});
      }
    } catch (e) {
      console.log(e);
    }
  }

  const downloadPdf = (e, record) => {console.log(record);
    window.open(`${API_URL}/api/contractors/method/downloadPdf/${record.id}?guid=${record.companyId}&account_alias=${user.account_alias}`, "_blank");
  }

  return (
    <div>

      <div className="fast-find__item">
        <SearchIcon style={{
          color: "#888",
          fontSize: 22,
          padding: "4px 8px"
        }}/>
        <Field>
          <InputBare
            placeholder="Поиск по ИНН"
            type="text"
            value={searchString}
            name="where.name"
            className="fast-find__item__input"
            onChange={(value, formContext, params) => {
              console.log(value);
              setSearchString(value);//formContext.submit();7722464004
            }}
          />
        </Field>
        <div className="fast-find__item__thumbler"></div>
      </div>


      <Grid grid-template-columns="100px 100px 100px 120px 2fr 1fr 50px 50px">

        <div className="head">
          <div>
            ИНН
          </div>
          <div>
            КПП
          </div>
          <div>
            ОКПО
          </div>
          <span className="grid_list__item">ОГРН</span>
          <div>
            Полное наименование
          </div>
          <div>
            Статус
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>

        {records.map((record, index) => {
//console.log(record);
         // const recordData = record.attributes;

          return(
            <div key={record.taxNumber}>
              <div>{record.taxNumber}</div>
              <div>{record.taxRegistrationReasonCode}</div>
              <div>{record.statisticalNumber}</div>
              <div>{record.registrationNumber}</div>
              <div>{record.legalForm} {record.companyName}</div>
              <div>{record.status}</div>
              <div>
                <Icon onClick={e => addContractor(e, record)}>
                  <PlusIcon/>
                </Icon>
              </div>
              <div>
                <Icon onClick={e => downloadPdf(e, record)}>
                  <PdfIcon/>
                </Icon>
              </div>
            </div>
          );
        })}

      </Grid>

    </div>
  );
};

export default CredinformList;
