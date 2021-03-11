const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const logger = require('morgan')
const fs = require('fs')
const app = express()
const avgsRouter = require('./routes/averages')

app.get('/', (req, res) => {

  res.send('api is running')
})

//cors
app.use(cors())
//this line is required to parse the request body
app.use(express.json())

//bodyparcer
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'client/build')));

//morgan
app.use(logger('dev'));

//avgsRouter
app.use("/average", avgsRouter);

/* Create - POST method */
app.post('/user/add', (req, res) => {
    //get the existing user data
    const existUsers = getUserData()
    
    //get the new user data from post request
    const userData = req.body
    //check if the userData fields are missing
    if (userData.age == null || userData.bmi == null) {
        return res.status(401).send({error: true, msg: 'User data missing'})
    }
    
    //check if the username exist already
    const findExist = existUsers.find( user => user.age === userData.age )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'age already exist'})
    }
    //append the user data
    existUsers.push(userData)
    //save the new user data
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})
/* Read - GET method */

app.get('/user/list', (req, res) => {
    const users = getUserData()
    res.send(users)
})


/* Update - Patch method */
app.patch('/user/update/:age', (req, res) => {
    //get the age from url
    const age = req.params.age
    //get the update data
    const userData = req.body
    //get the existing user data
    const existUsers = getUserData()
    //check if the age exist or not       
    const findExist = existUsers.find( user => user.age === age )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'age not exist in database'})
    }
    //filter the userdata
    const updateUser = existUsers.filter( user => user.age !== age )
    //push the updated data
    updateUser.push(userData)
    //finally save it
    saveUserData(updateUser)
    res.send({success: true, msg: 'User data updated successfully'})
})
/* Delete - Delete method */
app.delete('/user/delete/:age', (req, res) => {
    const age = req.params.age
    //get the existing userdata
    const existUsers = getUserData()
    //filter the userdata to remove it
    const filterUser = existUsers.filter( user => user.age !== age )
    if ( existUsers.length === filterUser.length ) {
        return res.status(409).send({error: true, msg: 'age does not exist'})
    }
    //save the filtered data
    saveUserData(filterUser)
    res.send({success: true, msg: 'Age removed successfully'})
    
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/react-client/build/index.html'));
  }); 

/* util functions */
//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('bmiAvg.json', stringifyData)
}
//get the user data from json file
const getUserData = () => {
    const jsonData = fs.readFileSync('bmiAvg.json')
    return JSON.parse(jsonData)    
}
/* util functions ends */
//configure the server port
app.listen(process.env.PORT || 3001, () => {
  console.log('Server runs on port 3001')
})

   




