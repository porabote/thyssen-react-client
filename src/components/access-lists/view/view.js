import React from "react";
import {NavLink} from "react-router-dom";
import moment from "moment";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";
import PickedList from "./PickedList";

const View = (props) => {

  moment.lang("ru");
  const {data} = props;

  return (
    <div className="content" style={{padding: "40px"}}>

      <p style={{padding: "30px 0 10px 0", color: "#555"}}>
        <NavLink className="crumb_link" to="/access-lists/feed/">
          <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
          Назад к списку
        </NavLink>
        {data.attributes.description}
      </p>

      <Tabs {...props}>
        <TabList>
          <Tab>Список пользователей</Tab>
        </TabList>
        <TabPanel>
          <PickedList {...props}/>
        </TabPanel>
      </Tabs>

    </div>
  )
}

export default View;
