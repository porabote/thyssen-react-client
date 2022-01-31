import React from 'react'
import AddObserver from '@components/observers/add-observer-form'
import ObserverUnsubscribe from '@components/observers/observer-unsubscribe'
import Api from '@services/api-service'
import { connect } from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddObject from "./add-object"
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import { StripedList, StripedListRow, StripedListCell } from 'porabote/striped-list';

class Objects extends React.Component {

  state = {
    data: [],
    loading: true,
    kindList: {
      self: "Базовый",
      rent: "Аренда",
      store: "Склад",
    },
  }

  deleteObject = (params = {entity_id, event_ids, user_ids}) => {

    // Api.get(`/api/objects/method/unsubscribe/`, {
    //   query: params
    // }).then((data) => {
    //   this.props.fetchRecord()
    // })
  }

  render() {

    return(
      <div>
        <div className="links_with_icon__wrap">

          <div
            className="link_with_icon"
            onClick={() => {
              this.props.pushItemToModal(
                <AddObject getRecord={this.props.getRecord} platformId={this.props.record.id}/>,
                'Добавить объект',
              );
            }}
          >
            <AddIcon style={{marginRight: '3px'}} />
            Добавить объект
          </div>

        </div>

        <StripedList style={{gridTemplateColumns: '450px 100px 1fr'}}>
          {this.props.objects.map((object, index) => {

            return(
              <StripedListRow key={index}>
                <StripedListCell>
                  {object.attributes.name}
                </StripedListCell>
                <StripedListCell>
                  {this.state.kindList[object.attributes.kind]}
                </StripedListCell>
                <StripedListCell className="grid_list__item center">
                  <RemoveCircleIcon
                    className="link_with_icon grey"
                    // onClick={(e) => {
                    //   this.deleteObject({
                    //     // entity_id: this.props.recordId,
                    //     // event_ids: this.props.businessEventIds,
                    //     // user_ids: [observer.relationships.user.id],
                    //   })
                    // }}
                  />
                </StripedListCell>
              </StripedListRow>
            )
          })}
        </StripedList>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    pushItemToModal: (content, title) => dispatch({ type: 'PUSH_MODAL_ITEM', payload: { title, content } }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Objects)