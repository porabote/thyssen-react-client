import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FeedListCell from './feed-list-cell'

class FeedListHeadRow extends Component {

    constructor(props) {
        super(props);

        const data = this.props.data

        //data.date_created = Moment(props.date_created).format("DD/ MM /YYYY")
        //data.date_period = Moment(props.date_period).format("DD / MM /YYYY")

        this.state = {
            rows: data,
            schema: props.schema

        }
    }

    componentDidMount() {


    }


    render() {

        if(this.state.rows === null) return(<div>Нет данных</div>)
        console.log(this.props);
        return(
            <Link
                to="/reports/view/3"
                className="list-grid"
                key={this.props.data.id}
                style={this.props.style}
            >

                {this.state.schema.map((schema) => {
                    return (
                        <FeedListCell key={schema.field}></FeedListCell>
                    )
                })}

            </Link>
        )
    }

}

export default FeedListHeadRow