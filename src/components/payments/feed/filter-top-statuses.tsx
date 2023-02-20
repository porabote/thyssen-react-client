import React, {useState, useEffect} from 'react';

const FilterTopStatuses = (props) => {

  let [statusId, setStatusId] = useState(props.formContext.entity.getAttribute("where.status_id"));

  const changeStatus = (statusId) => {

    setStatusId(statusId);
    if (statusId == 42 && !props.clientId) {
      props.formContext.entity.setAttribute('where.client_id', 'stub');
    } else {
      props.formContext.entity.setAttribute('where.client_id', '');
    }

    props.formContext.entity.setAttribute('where.status_id', statusId);
    props.formContext.submit();
  }

  return (
    <>
      <div className="feed-top-panel_statuses">
        <a onClick={() => changeStatus("")} className="feed-top-panel_statuses__item">Все</a>
        {props.data.map((item, index) => {
          return <span
            onClick={() => changeStatus(item.id)}
            className={`feed-top-panel_statuses__item ${(item.id == statusId) ? "active" : ""}`}
            key={index}>
          {item.attributes.name}
        </span>
        })}
      </div>
      <div>
        {statusId == 42 && props.clientId == 'stub' &&
          <div className="feed-top-panel_statuses__notice">Для просмотра и отправки акцептованных платежей, пожалуйста выбрите плательщика.</div>
        }
      </div>
    </>
  );
};

export default FilterTopStatuses;
