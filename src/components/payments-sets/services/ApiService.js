import React from "react";
import store from "@store";
import PaymentsSets from "../models/PaymentsSets";

const ApiService = () => {

  return  {

    create: async (entity) => {

      console.log(entity.getAttributes());

      return await new PaymentsSets().post(
        `create`,
        {
          body: entity.getAttributes()
        });
    }

  };

};

export default ApiService();
