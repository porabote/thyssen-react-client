import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ApiService, ApiServiceProvider } from 'porabote/services'
import { Auth, AuthProvider } from '../auth'
import store from '../../store'
import Layout from '../layout'
export default class App extends Component {

    render() {

        return (
            <Provider store={store}>
                <ApiServiceProvider value={ApiService}>
                    <AuthProvider value={Auth}>
                        <BrowserRouter basename="/porabote">
                            <Layout />
                        </BrowserRouter>
                    </AuthProvider>
                </ApiServiceProvider>
            </Provider>
        )
    }
}