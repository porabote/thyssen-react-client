import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FeedListCell from './feed-list-cell'
import Moment from 'moment';

class FeedListBodyRow extends Component {

    constructor(props) {
        super(props);
        
        const data = this.props.data

        this.state = {
            rows: data,
            schema: props.schema

        }
    }


    setValue(value, schema)
    {
        if(schema.dateFormat !== undefined) value = Moment(value).format("DD/ MM /YYYY")
        return value
    }

    render() {

        if(this.state.rows === null) return(<div>3</div>)
        let checkbar = (this.props.ckeckbar) ? <span className="list-grid__head">{this.props.ckeckbar}</span> : ''

        return(
            <Link
                to={this.props.linkTo}
                className="list-grid"
                key={this.props.data.id}
                style={{gridTemplateColumns: this.props.cellWidths}}
            >
                {checkbar}
                {this.state.schema.map((schema) => {

                    let value = this.setValue(this.state.rows[schema.field], schema)

                    return (
                        <FeedListCell key={schema.field}>{value}</FeedListCell>
                    )
                })}

            </Link>
        )
    }

}

export default FeedListBodyRow