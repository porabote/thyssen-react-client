import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from '@porabote/tabs'
import Api from '@services/api-service'
import ReportsViewFiles from './reports-view-files'
import ReportsData from './reports-data'
import ReportsHistory from './reports-history'
import Comments from '@porabote/comments'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

class ReportsView extends React.Component {

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

        Api.get(`/api/reports/get/${id}/`, {
            query: {
                include: [ 'files', 'departments', 'types' ]
            }
        }).then((data) => {
            this.setState({
                data: (typeof data.data !== 'undefined') ? data.data : []
            })
        })
    }

    render() {

        if (typeof this.state.data.id == "undefined") return <p>Данные записи загружаются</p>

        return(
            <div className="content" style={{padding: '40px'}}>

                <p style={{padding: '30px 0 10px 0', color: '#555'}}>
                    <NavLink className="crumb_link" to="/reports/feed/">
                        <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
                        Назад к списку
                    </NavLink>
                    Отчет № {this.state.data.id} / {this.state.data.date_created} -
                    <span style={{color: '#bababa'}}> Дмитрий Разумихин</span> </p>

                <Tabs {...this.props}>

                    <TabList>
                        <Tab>Файлы</Tab>
                        <Tab>Данные</Tab>
                        <Tab>История</Tab>
                        <Tab>Комментарии</Tab>
                    </TabList>


                    <TabPanel>
                        <ReportsViewFiles
                            fetchRecord={this.fetchRecord}
                            files={this.state.data.relationships.files}
                            data={this.state.data}
                        />
                    </TabPanel>
                    <TabPanel>
                        <ReportsData dicts={this.state.dicts} data={this.state.data} />
                    </TabPanel>
                    <TabPanel>
                        <ReportsHistory/>
                    </TabPanel>
                    <TabPanel>
                        <Comments/>
                    </TabPanel>

                </Tabs>

            </div>
        )
    }
}

export default ReportsView