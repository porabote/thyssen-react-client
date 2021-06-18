import React, { cloneElement } from 'react'
import { SubmitContext } from './form-context'

const SubmitButton = props => {

    return(
        <SubmitContext.Consumer>
            { submitForm => cloneElement(props.children, { submitForm, ...props })}
        </SubmitContext.Consumer>
    )

}

export default SubmitButton