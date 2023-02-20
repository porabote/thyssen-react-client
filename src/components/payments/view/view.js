import React from "react";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import History from "@/app/components/history";
import Comments from "@/app/components/comments";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import RecordView from "./record-view";
import ScanCopies from "./scan-copies/scan-copies";

const View = (props) => {

  moment.lang("ru");
  const {data} = props;

  return (
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "30px 0 10px 0", color: "#555"}}>
        <NavLink className="crumb_link" to="/payments/feed/">
          <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
          Назад к списку
        </NavLink>
        {data.attributes.description}
      </p>

      <Tabs {...props}>
        <TabList>
          <Tab>Скан-копия счёта</Tab>
          {/* <Tab>Данные</Tab> */}
          {/* <Tab>История</Tab> */}
          {/* <Tab>Комментарии</Tab> */}
        </TabList>

        <TabPanel>
          <ScanCopies {...props}/>
        </TabPanel>
        {/* <TabPanel> */}
        {/*   <RecordView {...props}/> */}
        {/* </TabPanel> */}

        {/* <TabPanel> */}
        {/*   <History where={{record_id: data.id, model_alias: "App.Payments"}}/> */}
        {/* </TabPanel> */}
        {/* <TabPanel> */}
        {/*   <Comments where={{record_id: data.id, model_alias: "App.Payments"}} /> */}
        {/* </TabPanel> */}
      </Tabs>

    </div>
  )
}

export default View;
