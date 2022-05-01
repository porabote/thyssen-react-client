import React from 'react';
import {connect} from 'react-redux';
import Profile from './profile';
import Navbar from '../navbar';
import {Tree} from 'porabote/datas';
import Api from '@services/api-service';
import PRBLogo from '../layout/svg/prb_logo.svg';

class Header extends React.Component {

  state = {
    menuTree: {}
  }

  componentDidMount() {
    Api.get(`/api/menus/method/getByAcl`, {}).then((data) => {
      this.setState({
        menuTree: Tree.buildNestedList(data.data)
      })
    })
  }

  render() {

    const bgColor = (this.props.auth.isAuth) ? '#fff' : ''

    return (
      <header style={{'background': bgColor}}>
        <div className="header-panel">

          <a className="header-panel__logo" href={"/"}>
            <img style={{width: '92px'}} src={PRBLogo}/>
          </a>
          {this.props.auth.isAuth &&
            <Navbar data={this.state.menuTree}/>
          }
          <Profile auth={this.props.auth}/>

        </div>
      </header>
    )

  }
}

const mapStateToProps = (state) => {
  return ({
    auth: state.auth,
  })
}

export default connect(mapStateToProps, null)(Header);