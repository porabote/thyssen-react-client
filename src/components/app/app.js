import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from '../../store'
import { BrowserRouter } from 'react-router-dom';

import Layout from '../common/layout'


export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </Provider>
        )
    }
}