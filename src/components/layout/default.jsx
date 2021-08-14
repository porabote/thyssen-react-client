import React from 'react'
import AppRouter from '@components/app-router'
import Header from '@components/header'
import Sidebar from '../sidebar'
import Modal from '@porabote/modal'

const Layout = () => {

    return(
        <div className="main">
            
            <div className="header">
                <Header/>
            </div>

            <section className="main-section">
                <AppRouter/>
            </section>

            <div className="sidebar-container">
                <Sidebar/>
            </div>

            <Modal/>

        </div>
    )

}

export default Layout