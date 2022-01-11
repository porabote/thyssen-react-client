import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { recordWithData } from '@hocs'
import { Tab, Tabs, TabList, TabPanel } from 'porabote/tabs'
import Api from '@services/api-service'
import SparesViewFiles from './spares-view-files'
import SparesData from './spares-data'
import History, { HistoryItem } from 'porabote/history'
import moment from 'moment'
import Comments from 'porabote/comments'
import Observers from './observers'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

class View extends React.Component {

  render() {

    moment.lang("ru");
    const { data } = this.props

    const dicts = this.props.dicts
    const history = data.relationships.history;
    const user = data.relationships.user.attributes;

    return(
      <div className="content" style={{padding: '40px'}}>

        <p style={{padding: '30px 0 10px 0', color: '#555'}}>
          <NavLink className="crumb_link" to="/spares/feed/">
            <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
            Назад к списку
          </NavLink>
          Отчет № {data.id} / {data.date_created} -
          <span style={{color: '#bababa'}}> от {user.last_name} {user.name}</span> </p>

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
            <SparesData dicts={dicts} data={data} />
          </TabPanel>
          <TabPanel>
            <History>
              {history.map((item, index) => {
                return(
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
              url={`/api/spares/${data.id}/relationships/comments`}
              recordId={data.id}
              modelAlias="spares"
              addUrl="/api/spares/method/addComment/"
            />
          </TabPanel>
          <TabPanel>
            <Observers
              model_alias="spares"
              record_id={data.id}
            />
          </TabPanel>

        </Tabs>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return({
    ...state.spares,
  })
}

export default connect(mapStateToProps)(recordWithData(View, {  }))