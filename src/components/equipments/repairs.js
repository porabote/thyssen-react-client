import React from "react";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";
import AddIcon from '@mui/icons-material/Add';
import RepairsAdd from "./repairs-add";
import { connect } from "react-redux";
import DateTime from "porabote/date-time";
import moment from "moment";
import {
  Form,
  Field,
  Input,
  Button,
  SubmitButton,
  Select,
  Option,
  InputDate,
  InputDatePeriod,
  Textarea,
} from 'porabote/form';

class Repairs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      date_at: '1900',
      date_to: '4999',
      months: DateTime.monthsList,
    };
  }

  render() {


    return(
      <div style={{display: 'grid', gridTemplateColumns: '350px 40px 1fr'}}>

        <div>

          <h3 style={{padding: '10px 0 10px 0'}}>Фильтр</h3>

          <Form
            values={{
              date: "",
              date_at: moment(new Date()).format(),
              date_to: moment(new Date()).format(),
              spares_ids: [],
            }}
          >

            <Field>
              <InputDatePeriod name="date" names={[ "date_at", "date_to" ]} label="Период проведения:"/>
            </Field>


            <Field>
              <Select
                name="spares_ids"
                label="Запчасти"
                empty={false}
                url="/api/spares/get/"
                mode="tags"
                tagElement={(val, list) => {
                  return(<span>{list[val].name}</span>);
                }}
              >
                {[].map((item, index) => {
                  let itemData = item[1];
                  return <Option key={index} value={itemData.id}>{itemData.name}</Option>;
                })}
              </Select>
            </Field>

          </Form>

        </div>

        <div></div>

        <div>

          <h3 style={{padding: '10px 0 40px 0'}}>ТО и ремонт</h3>
          <StripedList key={1} style={{gridTemplateColumns: '170px 100px 140px 140px 140px 150px 40px'}}>
            <StripedListRow key={99}>
              <StripedListCell><b>Вид ТО\ремонта</b></StripedListCell>
              <StripedListCell><b>Наработка</b></StripedListCell>
              <StripedListCell><b>Период проведения</b></StripedListCell>
              <StripedListCell><b>Время простоя</b></StripedListCell>
              <StripedListCell><b>Краткое описание</b></StripedListCell>
              <StripedListCell><b>Исполнитель</b></StripedListCell>
              <StripedListCell>

                <div
                  className="link_with_icon"
                  onClick={() => {
                    this.props.pushItemToModal(
                      <RepairsAdd
                        getRecord={this.props.getRecord}
                        record={this.props.record}
                      />,
                      'Добавить TO/Ремонт',
                    );
                  }}
                >
                  <AddIcon/>
                </div>

              </StripedListCell>
            </StripedListRow>

            {[].map((item, index) => {
              return (
                <StripedListRow key={index}>
                  <StripedListCell>{item.count}</StripedListCell>
                  <StripedListCell>{item.date_at} - {item.date_to}</StripedListCell>
                  <StripedListCell>{item.user_name}</StripedListCell>
                  <StripedListCell>{item.created_at}</StripedListCell>
                  <StripedListCell></StripedListCell>
                </StripedListRow>
              );
            })}
          </StripedList>

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushItemToModal: (content, title) => dispatch({type: 'PUSH_MODAL_ITEM', payload: {title, content}}),
  }
}
export default connect(null, mapDispatchToProps)(Repairs);