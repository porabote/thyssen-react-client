import React from 'react'
import Modal from '../modal'
import AppRouter from '../router'
import Header from '../header'
import { Sidebar } from '@porabote'

const Layout = ({content}) => {

    return(
        <div className="main">
            <div className="header">
                <Header/>
            </div>
            <div className="content">
                <section className="main-section">
                    <div className="container">
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