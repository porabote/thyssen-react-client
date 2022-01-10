import React from "react";
import { dispatch } from "react-redux";
import Loader from "porabote/loader";

export default (Component) => {

  class withDictsData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        loaded: false
      }
    }

    componentDidMount() {

      const requiredList = this.props.dictsRequired.filter((dict) => {
        return typeof this.props.data[dict] === "undefined"
      });

      this.props.requestDicts(requiredList);
    }

    render() {

      if (!this.props.loaded) {
        return <Loader/>
      }

      return(
        <React.Fragment>
          {
            React.cloneElement(<Component/>, {...this.props})
          }
        </React.Fragment>
      )
    }
  }

  return withDictsData;
}