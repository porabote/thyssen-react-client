import React from 'react'

const GridCell = (props) => {

    return (
        <div onClick={() => props.routeTo(props.noRoute)} style={props.style || {}} className="prb-grid__item">
            {props.children}
        </div>
    )
}

export default GridCell
