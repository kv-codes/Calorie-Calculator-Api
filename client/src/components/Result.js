import React, { Component } from 'react'

class Result extends Component {
    render() {
        return (
            <div>
                <p>Your {this.props.label}: {this.props.result}</p>
                <p>The average bmi for your age is {this.props.averageBmi.bmi}</p>
            </div>


        )
    }

}
export default Result; 