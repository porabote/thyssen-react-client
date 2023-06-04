import React from "react";
import Table, { Row, Cell } from "porabote/table";
import { Button } from "@app/form";
import Icon, { PdfIcon } from "@app/ui/icons";
import { API_URL } from "@configs";
import { useSelector } from "react-redux";

const RecordView = (props) => {

  const {
    attributes,
    relationships
  } = props.record;
  const { user } = useSelector(state => state.auth);

  return (
    <div>

      <div>
        <Button
          label="Скачать PDF Credinform"
          style={{
            padding: "10px",
            width: "200px"
          }}
          onClick={() => {
            window.open(`${API_URL}/api/contractors/method/downloadPdf/${props.record.id}?account_alias=${user.account_alias}`, "_blank");
          }}
        >
          <Icon size="24px" style={{ paddingRight: "10px" }}>
            <PdfIcon/>
          </Icon>
        </Button>
      </div>

      <Table grid-template-columns="150px minmax(200px, 1fr)">

        <Row>
          <Cell><b>ID</b></Cell>
          <Cell>
            {props.record.id}
          </Cell>
        </Row>
        <Row>
          <Cell><b>Название</b></Cell>
          <Cell>
            {attributes.name}
          </Cell>
        </Row>
        {/* <Row> */}
        {/*   <Cell><b>ОГРН</b></Cell> */}
        {/*   <Cell> */}
        {/*     {attributes.ogrn} */}
        {/*   </Cell> */}
        {/* </Row> */}
        <Row>
          <Cell><b>ИНН</b></Cell>
          <Cell>
            {attributes.inn}
          </Cell>
        </Row>
        <Row>
          <Cell><b>КПП</b></Cell>
          <Cell>
            {attributes.kpp}
          </Cell>
        </Row>
        <Row>
          <Cell><b>ОКПО</b></Cell>
          <Cell>
            {attributes.okpo}
          </Cell>
        </Row>
      </Table>
    </div>
  );

};

export default RecordView;
