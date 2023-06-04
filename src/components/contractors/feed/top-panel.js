import React from 'react';
import {Field, Button} from "@/app/form";
import CredinformList from "./dialogs/credinform-list";
import modal from "@app/modal";
import notifacations from "@/app/notifications";

const TopPanel = props => {

  return (
    <React.Fragment>
      <div className="buttons-panel">
        <Field>
          <Button
            label="Добавить через CredInform"
            onClick={(props) => {
              modal.open(
                <CredinformList
                  title="Добавление контрагента через CredInform."
                  payments_ids={props.formContext.entity.attributes.index_records_ids}
                />,
              );
            }}
          />
        </Field>

      </div>

      {/* <div> */}
      {/*   <span onClick={openAddModal} className="button-drop"> */}
      {/*       Добавить */}
      {/*   </span> */}
      {/* </div> */}

    </React.Fragment>
  );
}

export default TopPanel;
