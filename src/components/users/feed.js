import React from "react";
import { useSelector } from "react-redux";
import {ButtonLazyLoad, Form} from "porabote/form";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";
import {updateFilters} from "@components/filters/store/filters-actions";
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const {title, filter, data, meta} = useSelector(state => state.users);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
  }

  const statuses = {
    invited: 'Приглашён',
    active: 'Активен',
    fired: 'Уволен',
  }

  return (

    <Form
      values={filter}
      submitForm={(values) => {
        submitForm(values);
      }}
    >
      <div className="content feed">

        <div className="content__top-filter">
          <FilterTop/>
        </div>

        <div className="content-title">
          <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
          {title}
        </div>

        <div className="content__filter__left">
          <FilterLeft/>
        </div>

        <div className="content__tools_panel">
          <FeedTopPanel fetchData={props.fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 290px 180px 100px 1fr">

            <div className="head">
              <div></div>
              <div>Лицо</div>
              <div>Департамент</div>
              <div>Статус</div>
              <div>Добавлен</div>
            </div>

            {
              data.map((record, index) => {

                const attrs = record.attributes
                const rels = record.relationships

                const { avatar, department } = record.relationships;

                let avatarUri = (avatar) ? avatar.attributes.uri : '';
                const departmentName = (department) ? department.attributes.name : '';

                let Avatar = <div
                  className="header-panel__profile__photo"
                  style={{backgroundImage: `url(${avatarUri})`}}
                >
                </div>

                return (
                  <div linkTo={`/users/view/${attrs.id}`} key={attrs.id}>
                    <div>{Avatar}</div>
                    <div><b>{attrs.name}</b><br/>{attrs.post_name}</div>
                    <div>{departmentName}</div>
                    <div>{statuses[attrs.status]}</div>
                    <div>{moment(attrs.created_at).format("DD/MM/YYYY")}</div>
                  </div>
                )
              })
            }
          </Grid>
          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
        </div>
      </div>
    </Form>
  )
}


export default Feed;