import React, { Component } from 'react'
import Feed from './feed'
import View from './view'

class Users extends Component {

    render() {
        if (this.props.match.params.action === 'view') {
            return <View/>
        }

        return(
            <Feed/>
        )
    }
}

export default Users