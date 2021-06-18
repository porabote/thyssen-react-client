import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './header.less'
import '@porabote/form/form.less'
// import '../ui/icon.less'
import '@porabote/form/input.less'
// import '../form/select/select.less'
import '@porabote/form/button.less'
// import '../filter/filter.less'
// import '../modal/modal.less'
// import '../tabs/tabs.less'
// import '../uploader/uploader.less'
// import '../striped-list/striped-list.less'
// import './checkbox.less'
// import  './login-page.less'
// import './select.less'

import Profile from './profile'
import TopMenu from './main-menu'
import TopIcons from './top-icons'

var Header = props =>
{

    const auth = useSelector(state => state.auth)
    const bgColor = (auth.isAuth) ? '#fff' : ''

    return (
        <header style={{'background' : bgColor}}>
            <div className="header-panel">

                <NavLink className="header-panel__logo" to={"/feed"}></NavLink>
                <TopMenu auth={auth} />
                <TopIcons auth={auth} />
                <Profile auth={auth} />

            </div>
        </header>
    )
}
export default Header