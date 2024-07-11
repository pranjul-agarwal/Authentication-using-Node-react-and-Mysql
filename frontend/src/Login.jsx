import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/login', values)
        .then(res => {
          navigate('/home');
        })
        .catch(err => console.log(err))
    }
  };

  const handleInput = (event) => {
    setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }));
  }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className="bg-white p-3 rounded w-25">
        <h2>Log-In</h2>
        <form action="/login" method='post' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input type="email" placeholder='Enter Email' name='email' className='form-control rounded-0' onChange={handleInput} />
            {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' onChange={handleInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>

          <button type='submit' className='btn btn-success w-100'>Log in</button>
          <p>You are agree to our terms and policies</p>
          <Link to="/signup" className=' btn btn-default border w-100'>Create Account</Link>
        </form>
      </div>
    </div>


  )
}

export default Login