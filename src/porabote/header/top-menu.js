import React from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

class TopMenu extends React.Component
{

    render() {

        if(!this.props.auth.state.isAuth) {

            return (
                <div className="header-panel__nav" id="headerNav">
                </div>
            )
        }

        return (
            <div className="header-panel__nav" id="headerNav">
                <ul className="navbar-horizontal">
                    <NavLink className="navbar-horizontal__item navbar-horizontal__item__link" to="/reports/feed/">
                        Отчеты
                    </NavLink>
                    <NavLink className="navbar-horizontal__item navbar-horizontal__item__link" to="/payments-sets/feed/">
                        План счетов
                    </NavLink>
                    <NavLink className="navbar-horizontal__item navbar-horizontal__item__link" to="/docs/list/">
                        Документы
                    </NavLink>
                    <NavLink className="navbar-horizontal__item navbar-horizontal__item__link" to="/contractors/index/">
                        Контрагенты
                    </NavLink>
                    <NavLink className="navbar-horizontal__item navbar-horizontal__item__link" to="/dictionaries/index/">
                        Справочники
                    </NavLink>
                    <div className="navbar-horizontal__extended">
                        <div className="navbar-horizontal__extended__items">

                        </div>
                    </div>
                </ul>
            </div>

        )
    }
}

export default TopMenu