import React, { Component } from 'react'
import { ValuesContext, ErrorsContext, SetFieldValueContext, SubmitContext } from './form-context'

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            values: this.props.defaultValues,
            errors: []
        }
    }

    _setFieldValue = (name, value) => {
            this.setState({
                values: {
                    ...this.state.values,
                    [name]: value
                }
            })
    }

    _submitForm = (e) => {

        let values = { ...this.state.values }
console.log(values)
        if(typeof this.props.submitForm === "function") {
            return this.props.submitForm(values);
        }

        if(typeof this.props.beforeSave === "function") {
            values =  this.props.beforeSave(values);
        }

        fetch(this.props.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        })
            .then( response => {
                return response.json()
            })
            .then( response => {

                if(typeof this.props.afterSave == "function") {

                    if( response.errors ) {
                        this.setState({
                            errors: response.errors
                        })
                    }

                    this.props.afterSave(response)
                }

            })


    }

    render() {

        return(
            <SubmitContext.Provider value={this._submitForm.bind(this)}>
                <ValuesContext.Provider value={this.state.values} >
                    <ErrorsContext.Provider value={this.state.errors}>
                        <SetFieldValueContext.Provider value={this._setFieldValue.bind(this)}>
                            <form>
                                {
                                    React.Children.map(this.props.children, (child, key) => {
                                        return React.cloneElement(child, {  });
                                    })
                                }
                            </form>
                        </SetFieldValueContext.Provider>
                    </ErrorsContext.Provider>
                </ValuesContext.Provider>
            </SubmitContext.Provider>
        )
    }
}

export default Form