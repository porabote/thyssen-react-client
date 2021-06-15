import React from 'react'

const FeedListCell = (props) => {


    return (
        <span className="list-grid__item">
            {props.children}
        </span>
    )
}

export default FeedListCell