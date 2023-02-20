import React from 'react'
import Table, {Row, Cell} from 'porabote/table';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import ClearIcon from '@mui/icons-material/Clear';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";

const RecordView = (props) => {

  const attrs = props.data.attributes;

//console.log(props.data.relationships.contractor);
  return (
    <div>

      <Table grid-template-columns="150px minmax(200px, 1fr)">

        <Row>
          <Cell><b>ID платежа</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>

        <Row>
          <Cell><b>Статус</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>PSP элемент</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Объект</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Плательщик</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Контрагент</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Счет</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Сумма</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Процент оплаты</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Сумма в евро</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Платежный день</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Вид оплаты</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Объект платежа</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Предмет счета</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>НДС</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Назначение платежа</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Примечание</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
        
        <Row>
          <Cell><b>Код ВО</b></Cell>
          <Cell>
            {props.data.relationships.contractor.attributes.guid}
          </Cell>
        </Row>
      </Table>



        <div className="links_with_icon__wrap" style={{justifyContent: 'flex-end'}}>

          <div className="link_with_icon" onClick={() => props.editRecord(props.getRecord)}>
            <EditIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>
            Редактировать данные
          </div>

          {/*<div className="link_with_icon" onClick={() => props.deleteRecord(user.id, props.fetchFeedData)}>*/}
          {/*  <ClearIcon style={{fontSize: '19px'}} className="link_with_icon__icon"/>*/}
          {/*  Удалить спикера*/}
          {/*</div>*/}

        </div>

    </div>
  );

}

export default RecordView;
