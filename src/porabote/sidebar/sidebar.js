import React from 'react'
import {NavLink} from 'react-router-dom'
import './sidebar.less'
import SettingsIcon from '@material-ui/icons/Settings';
import MenuIcon from '@material-ui/icons/Menu';
import TocIcon from '@material-ui/icons/Toc';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';


class Sidebar extends React.Component {

    render() {

        return(
            <div className="sidebar">

                <div className="sidebar-head">
                    <ArrowForwardIosOutlinedIcon style={{ fontSize: 15, color: "#737A80", margin: '10px 0 0 10px' }}/>
                </div>
                <NavLink className="header__panel__auth__link" to={"/registration"}>
                    <ChatBubbleOutlineIcon style={{ fontSize: 16, color: "#737A80", marginRight: '12px' }} />
                    Чат
                </NavLink>
                <div className="sidebar-list">
                    <NavLink className="sidebar-item-link" to={"/registration"}>
                        <TocIcon style={{ fontSize: 18, color: "#737A80", marginRight: '12px' }}/>
                        Справочники
                    </NavLink>
                    <NavLink className="sidebar-item-link" to={"/news"}>
                        <FiberNewIcon style={{ fontSize: 18, color: "#737A80", marginRight: '12px' }}/>
                        Новости
                    </NavLink>
                    <NavLink className="sidebar-item-link" to={"/settings"}>
                        <SettingsIcon style={{ fontSize: 18, color: "#737A80", marginRight: '12px' }}/>
                        Настройки
                    </NavLink>
                </div>

            </div>
        )
    }
}

export default Sidebar