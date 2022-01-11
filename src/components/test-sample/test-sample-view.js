import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from 'porabote/tabs'
import Api from '@services/api-service'
import TestSampleViewFiles from './test-sample-view-files'
import TestSampleData from './test-sample-data'
import History, { HistoryItem } from 'porabote/history'
import moment from 'moment'
import Comments from 'porabote/comments'
import Observers from './observers'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

class TestSampleView extends React.Component {

    state = {
        data: []
    }

    componentDidMount() {
        this.fetchRecord();
    }

    fetchRecord = () => {
        let splits = window.location.pathname.split('/')
        const id = splits[splits.length - 1]

        if (typeof id == "undefined") return;

        Api.get(`/api/test-sample/get/${id}/`, {
            query: {
                include: [ 'files', 'departments', 'types', 'history', 'user', 'object' ]
            }
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : []
            })
        })
    }

    render() {

        if (typeof this.state.data.id == "undefined") return <p>Данные записи загружаются</p>

        const history = this.state.data.relationships.history;

        const user = this.state.data.relationships.user.attributes;
        
        return(
            <div className="content" style={{padding: '40px'}}>

                <p style={{padding: '30px 0 10px 0', color: '#555'}}>
                    <NavLink className="crumb_link" to="/test-sample/feed/">
                        <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
                        Назад к списку
                    </NavLink>
                    Отчет № {this.state.data.id} / {this.state.data.date_created} -
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
                        <TestSampleViewFiles
                            fetchRecord={this.fetchRecord}
                            files={this.state.data.relationships.files}
                            data={this.state.data}
                        />
                    </TabPanel>
                    <TabPanel>
                        <TestSampleData dicts={this.state.dicts} data={this.state.data} />
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
                            url={`/api/test-sample/${this.state.data.id}/relationships/comments`}
                            recordId={this.state.data.id}
                            modelAlias="test-sample"
                            addUrl="/api/test-sample/method/addComment/"
                        />
                    </TabPanel>
                    <TabPanel>
                        <Observers
                            model_alias="test-sample"
                            record_id={this.state.data.id}
                        />
                    </TabPanel>

                </Tabs>

            </div>
        )
    }
}

export default TestSampleView