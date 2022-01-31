import React from "react";
import {connect} from "react-redux";
import { Form, ButtonLazyLoad } from "porabote/form";
import {fetchFeedData} from "./store/spares-actions";
import { updateFilters } from "@components/filters/store/filters-actions";
import {requestDicts} from "@components/dicts/store/dicts-actions";
import {feedWithData} from "@hocs";
import Grid from "porabote/grid";
import FilterLeft from "./filter-left";
import ContentPanel from "./content-panel";
import FilterTop from "./filter-top";
import MenuIcon from "@material-ui/icons/Menu";
import moment from "moment";

class Feed extends React.Component {

  submitForm = (values) => {
    this.props.updateFilters(values, "equipments");
    this.props.fetchFeedData();
  }

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
            Запчасти обслуживание
          </div>

          <div className="content__filter__left">
            <FilterLeft/>
          </div>

          <div className="content__tools_panel">
            <ContentPanel fetchData={this.fetchData}/>
          </div>

          <div className="content__body">

            <Grid grid-template-columns="60px 140px 170px 80px 80px 80px 80px 120px 120px 140px 140px">

              <div className="head">
                <div>ID</div>
                <div>Название</div>
                <div>Описание</div>
                <div>Артикул</div>
                <div>Кол-во</div>
                <div>Ед. изм</div>
                <div>Склад</div>
                <div>Оборудование</div>
                <div>ТО</div>
                <div>Дата замены</div>
                <div>Дата добавления</div>
              </div>

              {
                data.map((record, index) => {
                  //console.log(record)
                  const attrs = record.attributes
                  const rels = record.relationships

                  return (
                    <div linkTo={`/spares/view/${attrs.id}`} key={attrs.id}>
                      <div>{attrs.id}</div>
                      <div>{attrs.name}</div>
                      <div>{attrs.description}</div>
                      <div>{attrs.vendor_code}</div>
                      <div>{attrs.quantity}</div>
                      <div>{attrs.unit}</div>
                      <div>{attrs.store_id}</div>
                      <div></div>
                      <div>{attrs.repair_id}</div>
                      <div>{moment(attrs.repair_date).format("DD/MM/YYYY")}</div>
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
    ...state.spares,
    dicts: state.dicts,
    requiredList: state.spares.requiredList
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilters: (data, storeAlias) => {
      dispatch(updateFilters(data, storeAlias));
    },
    fetchFeedData: () => {
      dispatch(fetchFeedData());
    },
  }
}

export default connect(null, mapDispatchToProps)(feedWithData(Feed, {storeAlias: "spares"}));