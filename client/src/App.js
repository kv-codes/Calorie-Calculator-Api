import React, { Component } from 'react';
import './App.css';
import CalorieCalculator from './components/CalorieCalculator';


class App extends Component {

  constructor(){
    super();
    this.state = {
      title: "BMI Calculator" 
    }
  } 

  render() {
    return (
      <div className="App">

        <CalorieCalculator title={this.state.title}/>


      </div>
    );

  }
}

export default App;