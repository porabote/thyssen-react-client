import React, { cloneElement } from 'react'
import { FormConsumer } from './form-context'
import { Button } from './'

const SubmitButton = props => {

    return(
        <FormConsumer>
            { formContext => {

                return(
                    <Button
                        {...props}
                        onClick={(e) => {
                            if(typeof props.submitForm == 'function') {
                                props.submitForm(formContext)
                            } else {
                                formContext.submitForm()
                            }
                        }}
                    ></Button>
                )
            }}
        </FormConsumer>
    )

}

export default SubmitButton