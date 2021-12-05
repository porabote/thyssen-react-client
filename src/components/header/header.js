import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Profile from './profile'
import Navbar from 'porabote/navbar'
import { Tree } from 'porabote/datas'
import { AuthConsumer } from '@components/auth'
import Api from '@services/api-service'
import PRBLogo from 'porabote/layout/svg/prb_logo.svg'

class Header extends React.Component {

    state = {
        menuTree: {}
    }

    componentDidMount()
    {
        Api.get(`/api/menus/get/`, {}).then((data) => {
            this.setState({
                menuTree: Tree.buildNestedList(data.data)
            })
        })
    }

    render() {

        return (
            <AuthConsumer>
                {
                    authContext => {

                        const bgColor = (authContext.id) ? '#fff' : ''

                        return(
                            <header style={{'background' : bgColor}}>
                                <div className="header-panel">

                                    <a className="header-panel__logo" href={"/"}>
                                        <img style={{width: '92px'}} src={PRBLogo}/>
                                    </a>
                                    {authContext.state.isAuth &&
                                        <Navbar data={this.state.menuTree}/>
                                    }
                                    <Profile auth={authContext.state} />

                                </div>
                            </header>
                        )
                    }
                }
            </AuthConsumer>
        )

    }
}
export default Header