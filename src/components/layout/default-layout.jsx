import React from 'react';
import Router from '@src/routes/router';
import Header from '@components/header';
import Modal from 'porabote/modal';
import ModalTS from '@app/Modal';
import Confirm from "porabote/confirm";
//import Styles from "../styles/styles";

const DefaultLayout = () => {

  return (
    <div className="main">

      <div className="header">
        <Header/>
      </div>

      <section className="main-section">
        <Router/>
      </section>

      <Modal/>
      <ModalTS/>
      <Confirm/>

    </div>
  )
}

export default DefaultLayout;
