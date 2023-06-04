import React from 'react';
import {useSelector} from "react-redux";
import {Button} from "@app/form";
import Icon, {PdfIcon} from "@app/ui/icons";
import {API_URL} from "@configs";

const CredinformData = (props) => {

  const { user } = useSelector(state => state.auth);

  return (
    <div>
      <Button
        label="Скачать PDF Credinform"
        style={{padding: "10px", width: "190px"}}
        onClick={() => {
          window.open(`${API_URL}/api/contractors/method/downloadPdf/${props.record.id}?account_alias=${user.account_alias}`, '_blank')
        }}
      >
        <Icon>
        <PdfIcon/>
        </Icon>
      </Button>
    </div>
  );
};

export default CredinformData;
