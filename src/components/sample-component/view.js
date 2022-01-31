import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {recordWithData} from "@hocs";
import {Tab, TabList, TabPanel, Tabs} from "porabote/tabs";
import SparesViewFiles from "./sample-component-view-files";
import RecordData from "./record-data";
import History, {HistoryItem} from "porabote/history";
import moment from "moment";
import Comments from "porabote/comments";
import { ObserversByRecord } from "../observers";
import ArrowRightRoundedIcon from "@material-ui/icons/ArrowRightRounded";

class View extends React.Component {

  render() {

    moment.locale("ru");
    const {data} = this.props

    const dicts = this.props.dicts
    const history = data.relationships.history;
    const user = data.relationships.user.attributes;

    return (
      <div className="content" style={{padding: "40px"}}>

        <p style={{padding: "30px 0 10px 0", color: "#555"}}>
          <NavLink className="crumb_link" to="/sample-component/feed/">
            <ArrowRightRoundedIcon style={{fontSize: "24px", marginRight: "2px", top: "7px", position: "relative"}}/>
            Назад к списку
          </NavLink>
          Отчет № {data.id} / {data.date_created} -
          <span style={{color: "#bababa"}}> от {user.last_name} {user.name}</span></p>

        <Tabs {...this.props}>

          <TabList>
            <Tab>Файлы</Tab>
            <Tab>Данные</Tab>
            <Tab>История</Tab>
            <Tab>Комментарии</Tab>
            <Tab>Наблюдатели</Tab>
          </TabList>


          <TabPanel>
            <SparesViewFiles
              fetchRecord={this.fetchRecord}
              files={data.relationships.files}
              data={data}
            />
          </TabPanel>
          <TabPanel>
            <RecordData dicts={dicts} data={data}/>
          </TabPanel>
          <TabPanel>
            <History>
              {history.map((item, index) => {
                return (
                  <HistoryItem
                    key={index}
                    msg={item.attributes.msg}
                    user={item.attributes.user_name}
                    datetime={moment(item.attributes.created_at).format("DD MMM YYYY HH:mm")}
                  />
                )
              })}
            </History>
          </TabPanel>
          <TabPanel>
            <Comments
              url={`/api/sample-component/${data.id}/relationships/comments`}
              recordId={data.id}
              modelAlias="sample_component"
              addUrl="/api/sample-component/method/addComment/"
            />
          </TabPanel>
          <TabPanel>
            <ObserversByRecord
              businessEventIds={[1, 2, 3]}
              recordId={data.id}
            />
          </TabPanel>

        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    ...state.sampleComponent,
  })
}

export default connect(mapStateToProps)(recordWithData(View, {}))