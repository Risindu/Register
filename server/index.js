const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./models/Employee")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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
                const id = user._id
                const token = jwt.sign({id}, "jwtSecret", {expiresIn: 3600})
                res.json({Login: true, token: token, user: user})
            }else{
                res.json({message: "Password is incorrect"})
            }
        }else{
            res.json({message: "User not registered"})
        }
 })
 .catch(err => res.json(err))
});


const verifyJwt=(req,res,next)=>{
    const token = req.header("access-token");
    if(!token){
        res.send("We need token please give us token next time")
    }else{
        jwt.verify(token, "jwtSecret",(err,decoded)=>{
            if(err){
                res.json("Not authenticated");
            }else{
                req.userId = decoded.id;
                next();
            }
        }
)}}

app.get("/checkauth", verifyJwt, (req, res) => {
   return res.json("Authenticated");
});



app.listen(3001, () => {
    console.log("Server is running on port 3001")
});