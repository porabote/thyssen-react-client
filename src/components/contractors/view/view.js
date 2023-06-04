import React, { useEffect, useState } from "react";
import {NavLink} from "react-router-dom";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import RecordView from "./record-view";
import CredinformData from "./CredinformData";

const View = (props) => {

  return (
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "30px 0 10px 0", color: "#555"}}>
        <NavLink className="crumb_link" to="/contractors/feed/">
          <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
          Назад к списку
        </NavLink>
        {props.record.attributes.description}
      </p>

      <Tabs {...props}>
        <TabList>
          <Tab>Данные</Tab>
          {/* <Tab>Скачать PDF</Tab> */}
        </TabList>

        <TabPanel>
          <RecordView record={props.record}/>
        </TabPanel>
        {/* <TabPanel> */}
        {/*   <CredinformData record={props.record}/> */}
        {/* </TabPanel> */}
      </Tabs>

    </div>
  )
}

export default View;
