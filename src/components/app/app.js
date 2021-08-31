import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { ApiService, ApiServiceProvider } from '@porabote/services'
import { AuthState, AuthProvider } from '../auth'
import store from '../../store'
import Layout from '../layout'
export default class App extends Component {

    render() {

        const auth = {
            isAuth: true,
            userData: JSON.parse(localStorage.getItem('user'))
        }

        return (
            <Provider store={store}>
                <ApiServiceProvider value={ApiService}>
                    <AuthProvider value={auth}>
                        <BrowserRouter basename="/porabote">
                            <Layout />
                        </BrowserRouter>
                    </AuthProvider>
                </ApiServiceProvider>
            </Provider>
        )
    }
}