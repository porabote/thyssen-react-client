import React, { Component } from 'react'
import { ValuesContext, ErrorsContext, SetFieldValueContext } from './form-context'

export default class Field extends Component {


    render(){

        return(
            <ErrorsContext.Consumer>
                { errors => (
                    <ValuesContext.Consumer>
                        { values => (
                                <SetFieldValueContext.Consumer>
                                    { setFieldValue => React.cloneElement(this.props.children, {
                                        setFieldValue,
                                        values,
                                        errors
                                    }) }
                                </SetFieldValueContext.Consumer>

                            )
                        }
                    </ValuesContext.Consumer>
                    )
                }
            </ErrorsContext.Consumer>
        )
    }
}