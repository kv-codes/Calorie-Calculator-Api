
import React, { Component } from 'react'
import Result from './Result';
import BmrResults from './BmrResults';


class Form extends Component {

    constructor(props){
        super(props);
        this.state = {
            gender: "",
            activity: "",
            averages: [],
            weight: 0,
            height: 0,
            age: 0,
            bmi: 0,
            bmr:0,
            calDaily: 0,
            calLoss: 0,
            avgbmis:[0],
            avgbmi: {}
        }
        this.handleHeightChange = this.handleHeightChange.bind(this);
        this.handleWeightChange = this.handleWeightChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleActivityChange = this.handleActivityChange.bind(this);
        this.getBMI = this.getBMI.bind(this);
        this.getBMR = this.getBMR.bind(this);
        this.getCALDAILY = this.getCALDAILY.bind(this);
        this.getCALLOSS = this.getCALLOSS.bind(this);
    }

    componentDidMount() {
        const API_URL= process.env.REACT_APP_API_URL || 'http://localhost:3001/average/list'
        fetch(`${API_URL}`)
        .then(response => response.json())

        .then( responseJson=> {


          this.setState({ averages:responseJson.data });
        });
    }     
    handleWeightChange(event){
        this.setState({weight: event.target.value})
    }

    handleHeightChange(event){
        this.setState({height: event.target.value})
    }

    handleAgeChange(event){
        this.setState({age: event.target.value})
        console.log(event.target.value)

    }

    handleGenderChange(event){
        this.setState({gender: event.target.value})
        console.log(event.target.value)
    }
    
    handleActivityChange(event){
        this.setState({activity: event.target.value})
    }

    getBMI(){
        console.log('averages', this.state.averages);
        console.log('age', this.state.age);

        var squaredHeight = parseInt(this.state.height) * parseInt(this.state.height);
        let avgBmi = this.state.averages.find(itm => itm.age === parseInt(this.state.age));
        console.log(avgBmi)
        this.setState({
            bmi: parseFloat((this.state.weight / squaredHeight)*(703)).toFixed(2),
            
            avgbmi: avgBmi
        });

        




    }

    getBMR(){
        let age = this.state.age;
        let gender = this.state.gender;
        let height = this.state.height;
        let weight = this.state.weight;

        // if (
        //     age === 0 ||
        //     gender === "" ||
        //     height === 0 ||
        //     weight === 0 
        // ) {
        //     this.setState({error: "All Fields are Required"});
        //     return;
        // }

        let bmrCalc=0;
        console.log(gender)
        if (gender === "1") {
            bmrCalc = 66 + (6.2 * weight) + (12.7 * height) - (6.76 * age);
            console.log(`Gender is male ${bmrCalc}`)
        } else {
            bmrCalc = 655.1 + (4.35 * weight) + (4.7 * height) - (4.7 * age);
            console.log(`Gender is female ${bmrCalc}`)
        }
        this.setState({bmr: parseFloat(bmrCalc).toFixed(2)});
        console.log(bmrCalc);
    }

    getCALDAILY() {
        let activity = this.state.activity;
        let bmrCalc = this.state.bmr;
        let calCalc = "";
        if (activity === "Sendentary(Little or no exercise)") {
            calCalc = bmrCalc * 1.2;
        }
        else if (activity === "Lightly active (light exercise/sports 1-3 days/week)") {
            calCalc = bmrCalc * 1.375;
        }
        else if (activity === "Moderately active (moderate exercise/sports 3-5 days/week)") {
            calCalc = bmrCalc * 1.55;
        }
        else if (activity === "Very active (hard exercise/sports 6-7 days a week)") {
            calCalc = bmrCalc * 1.725;
        }
        
        this.setState({calDaily: parseFloat(calCalc).toFixed(2)});       
    }

    getCALLOSS() {
        let calCalc = this.state.calDaily;
        let calcLoss;
        // if (calCalc===this.state.calDaily) {
            calcLoss = calCalc - 500;
        // }
        this.setState({calLoss:parseFloat(calcLoss ).toFixed(2)})
    }




    render() {
        return (
            <div>
                <hr/>
                <h1>Welcome to the Calorie Calculator! </h1>

                <p><b>1) Calculate BMI(Body Mass Index):</b></p>
              
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6">
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-right">Weight(lb's)</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="weight" name="weight" onChange={this.handleWeightChange} placeholder="Enter Your Weight"/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-right">Height(inches)</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="height" name="height" onChange={this.handleHeightChange} placeholder="Enter Your Height "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-sm-2 col-form-label text-right">Age</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="age" name="age"
                                    onChange={this.handleAgeChange} placeholder="Enter your Age" />
                                </div>
                            </div>

                            <br></br>
                            <br></br>

                            <div className="inputwrap">
                                <label className="label"><b>Gender</b></label>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.gender === "1"}
                                    onChange={this.handleGenderChange}
                                    className="genderM"
                                    name= "gender"
                                    value="1"
                                    />
                                    Male
                                </label>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.gender === "2"}
                                    onChange={this.handleGenderChange}
                                    className="genderF"
                                    name= "gender"
                                    value="2"
                                    />
                                    Female
                                </label>
                                
                            </div>
                            <br></br>

                            <div className="inputwrap">
                                <label className="label"><b>Fitness Level:</b></label>
                                <br></br>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.activity === "Sendentary(Little or no exercise)"}
                                    onChange={this.handleActivityChange}
                                    className="Sendentary"
                                    name="activity"
                                    value="Sendentary(Little or no exercise)"
                                    />
                                    Sendentary(Little or no exercise)
                                </label>
                                <br></br>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.activity === "Lightly active (light exercise/sports 1-3 days/week)"}
                                    onChange={this.handleActivityChange}
                                    className="Light"
                                    name="activity"
                                    value="Lightly active (light exercise/sports 1-3 days/week)"
                                    />
                                    Lightly active (light exercise/sports 1-3 days/week)
                                </label>
                                <br></br>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.activity === "Moderately active (moderate exercise/sports 3-5 days/week)"}
                                    onChange={this.handleActivityChange}
                                    className="Moderate"
                                    name="activity"
                                    value="Moderately active (moderate exercise/sports 3-5 days/week)"
                                    />
                                    Moderately active (moderate exercise/sports 3-5 days/week)
                                </label>
                                <br></br>
                                <label>
                                    <input
                                    type="radio"
                                    checked={this.state.activity === "Very active (hard exercise/sports 6-7 days a week)"}
                                    onChange={this.handleActivityChange}
                                    className="Very"
                                    name="activity"
                                    value="Very active (hard exercise/sports 6-7 days a week)"
                                    />
                                    Very active (hard exercise/sports 6-7 days a week)
                                </label>
                            </div>
                            <br></br>


                            <button type="submit" className="btn btn-primary btn-sm" onClick={this.getBMI} style={{float: 'center', marginLeft: '93px'}}>Get BMI</button>

                            <div className="col-lg-6">
                             {this.state.bmi !== 0 ? (<Result result={this.state.bmi} averageBmi = {this.state.avgbmi} label="BMI"/>) : null}
                            </div>

                            <br></br>

                            <p><b>2) Calculate BMR(Basal Metabolic Weight):</b></p>


                            <button type="submit" className="btn btn-primary btn-sm" onClick={this.getBMR} style={{float: 'center', marginLeft: '93px'}}>Get BMR</button>
                            <div className="col-lg-6">
                             {this.state.bmr !== 0 ? (<BmrResults result={this.state.bmr} bmr={this.state.bmr} label="BMR"/>) : null}
                            </div>
                            
                            <br></br>
                            <p><b>3) Calories to maintain weight:</b></p>
 
                            <button type="submit" className="btn btn-primary btn-sm" onClick={this.getCALDAILY} style={{float: 'center', marginLeft: '93px'}}>Get Daily Calories Recommended</button>
                            <div className="col-lg-6">
                             {this.state.calDaily !== 0 ? (<BmrResults result={this.state.calDaily} calDaily={this.state.calDaily} label="daily intake"/>) : null}
                            </div>
                            <br></br>
                            <br></br>

                            <p><b>4) Calories for weight loss:</b></p>

                            <button type="submit" className="btn btn-primary btn-sm" onClick={this.getCALLOSS} style={{float: 'center', marginLeft: '93px'}}>Get Calories for healthy weight loss</button>

                            <div className="col-lg-6">
                             {this.state.calLoss !== 0 ? (<BmrResults result={this.state.calLoss} calLoss={this.state.calLoss} label="daily intake"/>) : null}
                            </div>                            

                        </div>
                        <br/><br/>                      
                        <div className="col-lg-3"></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Form;