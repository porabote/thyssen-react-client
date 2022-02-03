import React from "react";
import { connect } from "react-redux";
import { Form, Field, InputBare } from "porabote/form"

class Dialogs extends React.Component {


  render() {
console.log(this.props)
    return(
      <div className="dialogs">

        <Form values={{user_id: ''}}>

          <div className="dialogs-user-search-wrap">
            <Field>
                <InputBare
                  name="user_id"
                  className="dialogs-user-search-input"
                  placeholder="Поиск"
                />
            </Field>
          </div>
          
        </Form>

        {this.props.dialogs.map((item, index) => {
          return(
            <div key={index} className="dialogs-item">{item.name}</div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = store => ({
  ...store.chat
})

const mapDispatchToProps = (dispatch) => {
  return {
    //action: addMsgThunk
  }
}

export default connect(mapStateToProps)(Dialogs);