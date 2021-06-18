import React from 'react'
import Modal from '../modal'
import AppRouter from '@components/app-router'
import Header from '../header'
import { Sidebar } from '@porabote'
import '@styles/style.less'

const Layout = () => {

    return(
        <div className="main">
            <div className="header">
                <Header/>
            </div>
            <div className="content">
                <section className="main-section">
                    <div className="container">
                        <AppRouter/>
                    </div>
                </section>
            </div>
            <div className="sidebar-container">
                <Sidebar/>
            </div>
        </div>
    )

}

export default Layout