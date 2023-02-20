import React, {useState, useEffect} from 'react';
import Grid from "/app/grid";
import Bills from "@/components/bills/models/Bills";
import moment from "moment";
import {RefreshIcon, LinkToIcon} from "@/app/ui/icons";

const ScanCopiesBillFiles = (props) => {

  const [files, setFiles] = useState([])

  useEffect(() => {
    getBill();
  }, []);

  const getBill = async () => {
    const bill = await new Bills().setWith(["files"]).get(props.record.attributes.bill_id);
    const files = bill.relationships.files || [];
    setFiles(files);
  }

  return (
    <div>
      <h4>Загруженные к счёту файлы</h4>

      <Grid grid-template-columns="70px 150px 1fr 100px 100px">
        <div className="head">
          <div>ID</div>
          <div>Дата</div>
          <div>Название</div>
          <div>Ссылка</div>
          <div>Обновить</div>
        </div>
        {files.map(item => {

          return (
            <div key={item.id}>
              <div>{item.id}</div>
              <div>{moment(item.attributes.date_created).format("DD.MM.Y")}</div>
              <div>{item.attributes.basename}</div>
              <div>
                <span onClick={() => {
                  window.open(item.attributes.uri, "_blank");
                }}>
                <LinkToIcon/>
                  </span>
              </div>
              <div>
                <RefreshIcon/>
              </div>
            </div>
          );
        })}
      </Grid>

    </div>
  );
}
  ;

  export default ScanCopiesBillFiles;
