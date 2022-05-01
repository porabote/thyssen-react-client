import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {recordWithData} from "@hocs";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import RecordData from "./record-data";
import Permissions from "./permissions"
import moment from "moment";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

const View = (props) => {

    moment.lang("ru");
    const { data } = props;

    return (
      <div className="content" style={{padding: "40px"}}>

        <p style={{padding: "30px 0 10px 0", color: "#555"}}>
          <NavLink className="crumb_link" to="/users/feed/">
            <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
            Назад к списку
          </NavLink>
          {data.attributes.post_name} {data.attributes.name}
        </p>

        <Tabs {...props}>

          <TabList>
            <Tab>Данные</Tab>
            <Tab>Права</Tab>
          </TabList>


          <TabPanel>
            <RecordData data={data}/>
          </TabPanel>
          <TabPanel>
            <Permissions data={data}/>
          </TabPanel>

        </Tabs>

      </div>
    )

}


export default View;