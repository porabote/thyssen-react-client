
import React from 'react'

const FeedListHead = (props) => {

    const getItems = (schema) => {
        return schema.map((data) => {
            return (
                <span className="list-grid__head" key={data.name}>{data.name}</span>
            )
        })
    }

    const headGrid = getItems(props.schema)
    let checkbar = (props.ckeckbar) ? props.ckeckbar : ''

    return(
        <div className="list-grid head" style={{gridTemplateColumns: props.cellWidths}}>

             <span className="list-grid__head">
                {checkbar}
            </span>

            {headGrid}

        </div>
    )
}

export default FeedListHead