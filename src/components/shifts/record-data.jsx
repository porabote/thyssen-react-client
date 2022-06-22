import React from "react";
import {StripedList, StripedListCell, StripedListRow} from "porabote/striped-list";

const RecordData = (props) => {

  return (
    <div>
      <h3 style={{padding: '0px 0 10px 0'}}>Информация</h3>
      <StripedList style={{gridTemplateColumns: '250px 1fr'}}>
        <StripedListRow>
          <StripedListCell>Наименование</StripedListCell>
          <StripedListCell>
            {props.attrs.title}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Руководитель</StripedListCell>
          <StripedListCell>
            {props.rels.head_user && props.rels.head_user.attributes.name}
          </StripedListCell>
        </StripedListRow>
        <StripedListRow>
          <StripedListCell>Платформа</StripedListCell>
          <StripedListCell>
            {props.rels.platform && props.rels.platform.attributes.ru_alias}
          </StripedListCell>
        </StripedListRow>
      </StripedList>
    </div>

  );
}

export default RecordData;