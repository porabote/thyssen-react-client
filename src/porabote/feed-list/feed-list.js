import React, { Component } from 'react'
import { FeedListHead } from './'

export default class FeedList extends Component {

    render() {
        return(
            <div className="feed-list-wrap">
                <div className="table-hover" id="tableFeed" cells-width={this.props.cellWidths}>

                    <FeedListHead {...this.props} />

                    {this.props.children}

                </div>
            </div>
        )
    }

}