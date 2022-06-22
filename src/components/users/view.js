import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {recordWithData} from "@hocs";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import RecordData from "./record-data";
import Permissions from "./permissions";
import UsersRequests from "./users-requests";
import moment from "moment";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

const View = (props) => {

  moment.lang("ru");
  const {data} = props;

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
          {props.isCanEdit && <Tab>Права</Tab>}
          {props.isCanEdit && <Tab>Запросы</Tab>}
        </TabList>


        <TabPanel>
          <RecordData getRecord={props.getRecord} data={data} {...props}/>
        </TabPanel>
        {props.isCanEdit &&
          <TabPanel>
            <Permissions data={data}/>
          </TabPanel>
        }
        {props.isCanEdit &&
          <TabPanel>
            <UsersRequests sendInvitationNotification={props.sendInvitationNotification} getRecord={props.getRecord} user={data}/>
          </TabPanel>
        }
      </Tabs>

    </div>
  )

}


export default View;