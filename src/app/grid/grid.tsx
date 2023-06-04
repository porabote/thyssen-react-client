import React, {Component} from "react";
import GridRow from "./grid-row";
import "./grid.less";

class Grid extends Component {

  render() {

    return (
      <div className="prb-grid-wrap">
        <div className="prb-grid-hover">
          {
            React.Children.map(this.props.children, (row, index) => {
              return (
                <GridRow
                  className="prb-grid-row"
                  grid-template-columns={this.props["grid-template-columns"]}
                  {...row.props}
                />
              )
            })
          }
        </div>
      </div>
    )
  }

}

export default Grid
