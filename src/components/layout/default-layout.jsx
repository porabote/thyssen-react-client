import React from "react";
import Router from "@src/routes/router";
import Header from "@components/header";
import Modal from "porabote/modal";
import ModalContainer from "/app/modal/modal-container";
import ConfirmPrb from "porabote/confirm";
import Notifications from "@/app/notifications/Notifications";
import Dialog from "@app/dialog/Dialog";

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
      <ModalContainer/>
      <ConfirmPrb/>
      <Notifications/>
      <Dialog/>

    </div>
  );
};

export default DefaultLayout;
