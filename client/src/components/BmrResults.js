import React, { Component } from 'react'

class BmrResults extends Component {
    render() {
        return (
            <div>
                <p>Your {this.props.label}: {this.props.result}</p>

            </div>


        )
    }

}
export default BmrResults; 