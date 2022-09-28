import React from 'react'
import Table, {Row, Cell} from 'porabote/table';
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import SubjectIcon from '@mui/icons-material/Subject';
import ClearIcon from '@mui/icons-material/Clear';
import Upload, {FileInput, InputFileCustom} from "porabote/upload";
import {API_URL} from "@configs";

const RecordData = (props) => {

  const attrs = props.data.attributes;
  const {logo} = props.data.relationships;
  const logoUri = (logo) ? `/files${logo.attributes.uri}` : '';

  const uploadLogo = () => {
    props.getRecord();
  }

  return (
    <div>

      <div className="user-profile">
        <Upload preview={false} uploadCallback={uploadLogo} data={{
          record_id: attrs.id,
          model_alias: "Companies",
          label: "logo",
        }}>
          <FileInput name="files[]" uploadCallback={uploadLogo}>
            <div className="user-profile-avatar" onClick={uploadLogo} style={{cursor: 'pointer'}}>
              <div className="user-profile-avatar-img" style={{backgroundImage: `url('${API_URL}${logoUri}')`}}></div>
            </div>
          </FileInput>
        </Upload>
      </div>

      <Table grid-template-columns="150px minmax(200px, 1fr)">
        <Row>
          <Cell><b>Название</b></Cell>
          <Cell>
            {attrs.full_name}
          </Cell>
        </Row>
        <Row>
          <Cell><b>ИНН</b></Cell>
          <Cell>
            {attrs.inn}
          </Cell>
        </Row>
        <Row>
          <Cell><b>КПП</b></Cell>
          <Cell>
            {attrs.kpp}
          </Cell>
        </Row>
        <Row>
          <Cell><b>ОГРН</b></Cell>
          <Cell>
            {attrs.ogrn}
          </Cell>
        </Row>
        <Row>
          <Cell><b>ОКПО</b></Cell>
          <Cell>
            {attrs.okpo}
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

export default RecordData;