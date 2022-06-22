import React from "react";
import { useSelector } from "react-redux";
import { Form, ButtonLazyLoad, Button } from "porabote/form";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import FeedPreloader from "../feed/feed-preloader";

const Feed = (props) => {

  const { title, filter, data, meta } = useSelector(state => state.tickets);

  const submitForm = (values) => {
    props.updateFilters(values);
    props.fetchData();
  }

  if (!props.isDictsLoaded) {
    return <FeedPreloader title={title}/>;
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
          <FeedTopPanel createTicket={props.createTicket} fetchData={props.fetchData}/>
        </div>

        <div className="content__body">

          <Grid grid-template-columns="60px 190px 120px 150px 150px 150px 220px 150px">
            <div className="head">
              <div>ID</div>
              <div>Статус</div>
              <div>Описание</div>
            </div>

            {
              data.map((record, index) => {
                const attrs = record.attributes
                let {
                  user,
                  type,
                  status
                } = record.relationships;

                return (
                  <div linkTo={`/tickets/view/${attrs.id}`} key={attrs.id}>
                    <div>{attrs.id}</div>
                    <div>{status && status.name}</div>
                    <div>{attrs.comment}</div>
                  </div>
                )
              })
            }
          </Grid>

          <div style={{width: '1000px', margin: '20px auto', textAlign: 'right'}}>
            <Button
              className="on-button grey-stroke_x_yellow-fill icon-excel__grey_x_white"
              type="button"
              onClick={() => {
                props.exportFeedToExcel(data);
              }}
            >Экспорт в Excel
            </Button>
          </div>
          <ButtonLazyLoad fetchData={props.fetchData} {...meta}/>
        </div>
      </div>
    </Form>
  )
}

export default Feed;