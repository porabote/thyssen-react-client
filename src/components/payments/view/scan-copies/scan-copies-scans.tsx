import React, {useEffect, useState} from 'react';
import {DoneIcon} from "/app/ui/icons";
import {Button} from "/app/form";
import Payments from "../../models/Payments";

const ScanCopiesScans = (props) => {

  const [scans, setScans] = useState([]);

  useEffect(() => {
    getScanFiles();
  }, []);

  const getScanFiles = async () => {
    let scans = await Payments.getScanFiles(props.record.id);
    setScans(scans.data);
  };

  const setPspTable = async (scanFileId) => {
    let scans = await Payments.setPspTable(scanFileId, props.record.id);
    getScanFiles();
  }

  return (
    <div style={{width: "1000px", margin: "0 auto"}}>

      {scans.map((scan) => {console.log(scan.child);

        let scanUrl = `https://thyssen24.ru/${scan.uri}`;

        let imgWidth = 0;
        let imgHeight = 0;

        const img = new Image();
        img.src = scanUrl;
        img.onload = function() {
          imgWidth = this.width;
          imgHeight = this.height;
        }

        return(
          <div key={scan.id} style={{padding: 0, position: "relative"}}>

            <div className="payment-file__panel">

              <div className="buttons-panel">
                <Button onClick={() => setPspTable(scan.id)} key={0} label="Вставить/Обновить PSP таблицу" style={{width: "260px"}}>
                  <DoneIcon style={{
                    fill: "#9ba6b8",
                    paddingRight: "10px",
                    width: "24px",
                    height: "24px",
                  }}/>
                </Button>

                <Button key={1} label="Вставить/Обновить подпись" style={{width: "240px"}}>
                  <DoneIcon style={{
                    fill: "#9ba6b8",
                    paddingRight: "10px",
                    width: "24px",
                    height: "24px",
                  }}/>
                </Button>
              </div>
            </div>

            <div className="payment-file__list" style={{padding: 0, display: "inline-block"}}>

              <div className="payment-file__list__img__wrap"
                   id={`draggableArea${scan.id}`}
                   style={{
                     // width: `${imgWidth}px`,
                     // height: `${imgHeight}px`,
                     padding: 0,
                     position: "relative",
                     display: "inline-block",
                     border: "1px solid red",
              }}>
                <img src={scanUrl} className="payment-file__list__img"/>

                {scan.child &&
                  scan.child.map(img => {

                    let scanUrl = `https://api.thyssen24.ru/${img.uri}`;

                    let dataJson = img.data_json ? JSON.parse(img.data_json) : {};
                    let topPosition = dataJson.axis ? dataJson.axis.top : 400;
                    let leftPosition = dataJson.axis ? dataJson.axis.left : 50;

                    return <img
                      src={scanUrl}
                      className="payment-file__list__img"
                      style={{
                        position: 'absolute',
                        top: `${topPosition}px`,
                        left: `${leftPosition}px`,
                        border: "1px solid red"
                      }} />;
                  })
                }


              {/*  //echo '<div style="position: relative;">';*/}
              {/*  echo $this->OnHtml->display('image', [*/}
              {/*  'url' => $child['uri'],*/}
              {/*  'style' => 'margin: 0;',*/}
              {/*  'id' => 'draggable' . $child['id'],*/}
              {/*  'class' => 'draggable',*/}
              {/*  'record-id' => $child['id'],*/}

              {/*  ]);*/}
              {/*  // echo '</div>';*/}


              </div>
            </div>


          </div>
        );
      })}

    </div>
  );
};

export default ScanCopiesScans;
