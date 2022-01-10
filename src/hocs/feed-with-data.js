import React from "react";
import { dispatch } from "react-redux";
import Loader from "porabote/loader";
import Api from "@services/api-service";
import { Form, ButtonLazyLoad } from "porabote/form";

export default (Component) => {

  class feedWithData extends React.Component {

    constructor(props) {
      super(props);

      this.state = {
        filter: {...props.filter},
        nextPage: 1,
        requiredList: props.requiredList,
        hasError: false,
      }
    }

    componentDidMount() {
      this.props.fetchFeedData(this.state.filter);
    }

    static getDerivedStateFromError(error) {
      // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
      logErrorToMyService(error, errorInfo);
    }

    render() {

      if (this.state.hasError) {
        // Можно отрендерить запасной UI произвольного вида
        return <h1>Что-то пошло не так.</h1>;
      }

      if (this.props.loading) {
        return <Loader/>
      }

      return(
        <Form
          values={this.state.filter}
          submitForm={this.submitForm}
        >
          {
            React.cloneElement(<Component/>, {...this.props})
          }

          <ButtonLazyLoad {...this.props.meta}/>
        </Form>
      )
    }
  }

  return feedWithData;
}