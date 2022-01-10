import React from 'react';
import AppRouter from '@components/app-router';
import Header from '@components/header';
import Modal from 'porabote/modal';
import Styles from '../styles/styles'

const Layout = () => {

  return (
    <div className="main">

      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <AppRouter/>
      </section>

      <Modal/>

    </div>
  )

}

export default Layout