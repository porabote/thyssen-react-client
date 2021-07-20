import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { ApiService, ApiServiceProvider } from '@porabote/services'
import { AuthState, AuthProvider } from '@porabote/auth'
import store from '../../store'

import Layout from '@porabote/layout'

export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <ApiServiceProvider value={ApiService}>
                    <AuthProvider value={AuthState}>
                        <BrowserRouter>
                            <Layout />
                        </BrowserRouter>
                    </AuthProvider>
                </ApiServiceProvider>
            </Provider>
        )
    }
}