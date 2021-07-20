import React, { cloneElement } from 'react'
import { FormConsumer } from './form-context'

const SubmitButton = props => {

    return(
        <FormConsumer>
            { submitForm => cloneElement(props.children, { submitForm, ...props })}
        </FormConsumer>
    )

}

export default SubmitButton