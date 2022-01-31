import React from "react";
import {connect} from "react-redux";
import {ButtonLazyLoad, Form} from "porabote/form";
import {fetchFeedData} from "./store/users-actions";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import FeedTopPanel from "./feed-top-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";

class Feed extends React.Component {

  render() {

    const {data, dicts} = this.props

    return (

      <Form
        values={this.props.filter}
        submitForm={(values) => {
          this.submitForm(values);
        }}
      >

        <div className="content feed">

          <div className="content__top-filter">
            <FilterTop/>
          </div>

          <div className="content-title">
            <MenuIcon style={{color: '#999', marginRight: '11px', fontSize: '16px'}}/>
            {this.props.title}
          </div>

          <div className="content__filter__left">
            <FilterLeft/>
          </div>

          <div className="content__tools_panel">
            <FeedTopPanel fetchData={this.fetchData}/>
          </div>

          <div className="content__body">

            <Grid grid-template-columns="60px 1fr 170px 180px">

              <div className="head">
                <div>ID</div>
                <div>Название</div>
                <div>Объект</div>
                <div>Дата добавления</div>
              </div>

              {
                data.map((record, index) => {

                  const attrs = record.attributes
                  const rels = record.relationships

                  return (
                    <div linkTo={`/users/view/${attrs.id}`} key={attrs.id}>
                      <div>{attrs.id}</div>
                      <div>{attrs.last_name} {attrs.name}</div>
                      {/*<div>{rels.object.attributes.name}</div>*/}
                      <div>{moment(attrs.created_at).format("DD/MM/YYYY")}</div>
                    </div>
                  )
                })
              }
            </Grid>

          </div>
        </div>
        <ButtonLazyLoad {...this.props.meta}/>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    ...state.users,
    dicts: state.dicts,
    requiredList: state.users.requiredList
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFeedData: () => {
      dispatch(fetchFeedData());
    },
    requestDicts: (requiredList) => {
      dispatch(requestDicts(requiredList));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(feedWithData(Feed, {storeAlias: "users"}));