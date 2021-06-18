import React, { createContext } from 'react'

const ValuesContext = createContext({});
const ErrorsContext = createContext({});
const SetFieldValueContext = createContext(() => {});
const SubmitContext = createContext(() => {})

export {
    ValuesContext,
    ErrorsContext,
    SetFieldValueContext,
    SubmitContext
}