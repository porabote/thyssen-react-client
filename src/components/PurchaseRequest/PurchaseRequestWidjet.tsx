import React, {useState, useEffect} from 'react';
import Api from "@/services/api-service"
import "./PurchaseRequestWidjet.less";
import {OptionProps} from "../../app/Form/Select/Option";

const PurchaseRequestWidjet = () => {

  const [managers, setManagers] = useState<{ [key: number]: any; }>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let res = await Api.get("/api/purchase-request/method/getWidjetData/");
    sortDataByManagers(res.data.users, res.data.requests);
  }

  const sortDataByManagers = (users: [], requests: []) => {

    let managers: { [key: number]: any } = {};

    let dateTwoWeekAgo = new Date();
    dateTwoWeekAgo.setDate(dateTwoWeekAgo.getDate() - 14);

    users.map((user: { id: number }) => {
      managers[user.id] = Object.assign(user, {requests: {}})
    });

    type requestProps = {
      id: number,
      nomenclatures: [],
      paused_flg: number | null,
      steps: {acceptor: {[key: string]: any;}}[];
    };

    requests.map((request: requestProps) => {
      request.nomenclatures.map((nmcl: { manager_id: number, status_id: number }) => {

        if (!managers[nmcl.manager_id] || !nmcl.manager_id || nmcl.status_id != 34) return;

        let requests = managers[nmcl.manager_id].requests;

        if (!requests[request.id]) requests[request.id] = {count: 0, nmcl_id: null};

        requests[request.id]['count']++;// = request.nomenclatures.length;

        let startDate = new Date("2022-01-01 00:00:00");
        if (request.steps.length) {
          startDate = new Date(request.steps[request.steps.length - 1].acceptor.accepted_at);
        }

        requests[request.id]['status'] =
          (startDate.getTime() < dateTwoWeekAgo.getTime()) ? 'overdue' : 'regular';
        if (request.paused_flg == 1) requests[request.id]['status'] = 'paused';

      });
    });

    setManagers(managers);
  }

  return (
    <div className="pr-widjet">
      <div className="pr-widjet-title">
        Заявки в работе
      </div>

      <div className="pr-widjet-managers">
        {Object.entries(managers).map((user) => {
          const [id, userData] = user;

          let {requests} : {requests: {requestData: any}} = userData;

          return <div key={id} className="pr-widjet-managers-manager">
            <div key={id} className="pr-widjet-managers-manager-name">
              {userData.name}
            </div>

            {!Object.entries(userData.requests).length &&
            <div className="pr-widjet-empty-set">Нет активных заявок</div>
            }

            <div className="pr-widjet-nmcls-list">
              {Object.entries(requests).map((request) => {

                const request_id = request[0];
                const requestData: {status: string, count: number} = request[1];

                return (<a key={request_id} className={`pr-widjet-nmcls-list-link ${requestData.status}`} target="_blank"
                           href={`/purchaseRequest/view/${request_id}`}>

                  <span className="pr-widjet-nmcls-list-link-nmcl-count">{requestData.count}</span>
                  {request_id}
                  </a>);
              })}
            </div>
          </div>
        })}

      </div>

    </div>
  );
};

export default PurchaseRequestWidjet;

function managers(managers: any) {
  throw new Error('Function not implemented.');
}

