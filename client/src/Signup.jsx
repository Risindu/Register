import React from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {  
        e.preventDefault();
        axios.post('http://localhost:3001/register',{name,email,password}).then((res) => {console.log(res);navigate('/login')}).catch((err) => {console.log(err);});
    }

return(
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
        <div className='bg-light p-5 rounded'>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} method='post'>
            {/* Name Input Field */}
            <div className='mb-3'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type='text' id='name' className='form-control rounded-0' placeholder='Enter Name' autoComplete='off' onChange={(e)=>setName(e.target.value)}/>
            </div>
            {/* Email Input Field */}
            <div className='mb-3'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type='email' id='email' className='form-control rounded-0' placeholder='Enter Email' autoComplete='off' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            {/* Password Input Field */}
            <div className='mb-3'>
                <label htmlFor='password'><strong>Password</strong></label>
                <input type='password' id='password' className='form-control rounded-0' placeholder='Enter Password' autoComplete='off' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
            </form>
            <p>Aleready have an account ?</p>
            <Link to="/login" className="btn btn-primary w-100 rounded-0">Login</Link>
        </div>
    </div>
);
}
export default Signup;