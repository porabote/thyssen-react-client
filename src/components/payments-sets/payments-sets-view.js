import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tab, Tabs, TabList, TabPanel } from '@porabote/tabs'
import PaymentsSetViewFiles from './payments-set-view-files'
import PaymentsSetViewPayments from './payments-set-view-payments'
import PaymentsSetStripedList from './payments-set-striped-list'
import History from '@porabote/history'
import Comments from '@porabote/comments'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

class PaymentsSetsView extends React.Component {

    render() {

        return(
            <div className="content" style={{padding: '40px'}}>

                <p style={{padding: '30px 0 10px 0', color: '#555'}}>
                    <NavLink className="crumb_link" to="/payments-sets/feed/">
                        <ArrowRightRoundedIcon style={{fontSize: '24px', marginRight: '2px', top: '7px', position: 'relative'}}/>
                        Назад к списку
                    </NavLink>
                    План оплат № 05 / 04/2021 -
                    <span style={{color: '#bababa'}}> Дмитрий Разумихин</span> </p>

                <Tabs {...this.props}>

                    <TabList>
                        <Tab>Платежи</Tab>
                        <Tab>Файлы</Tab>
                        <Tab>Данные</Tab>
                        <Tab>История</Tab>
                        <Tab>Комментарии</Tab>
                    </TabList>

                    <TabPanel>
                        <PaymentsSetViewPayments/>
                    </TabPanel>
                    <TabPanel>
                        <PaymentsSetViewFiles/>
                    </TabPanel>
                    <TabPanel>
                        <PaymentsSetStripedList/>
                    </TabPanel>
                    <TabPanel>
                        <History/>
                    </TabPanel>
                    <TabPanel>
                        <Comments/>
                    </TabPanel>

                </Tabs>

            </div>
        )
    }
}

export default PaymentsSetsView