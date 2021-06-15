import React, { Component } from 'react'

export default class Form extends Component {

    // constructor(props) {
    //     super(props);
    //
    // }

    render(){

        return(
            <form>
                {
                    React.Children.map(this.props.children, (child, key) => {
                        return React.cloneElement(child, {  });
                    })
                }
            </form>
        )
    }
}