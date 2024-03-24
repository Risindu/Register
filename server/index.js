const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")
const bcrypt = require("bcrypt")
const app = express()


app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/employee");

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    const hash = bcrypt.hashSync(password, 10);
    EmployeeModel.create({name,email,password:hash}).then(employees => res.json(employees)).catch(err => res.json(err))
});

app.post("/login", (req, res) => { 
 const {email, password} = req.body;
 EmployeeModel.findOne({email:email}).then(user=>{
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                res.json({message: "Successfully Logged In"})
            }else{
                res.json({message: "Password is incorrect"})
            }
        }else{
            res.json({message: "User not registered"})
        }
 })
 .catch(err => res.json(err))
});
app.listen(3001, () => {
    console.log("Server is running on port 3001")
});