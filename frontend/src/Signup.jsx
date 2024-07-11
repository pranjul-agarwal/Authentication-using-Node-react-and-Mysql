import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation';
import { useState } from 'react';
import axios from 'axios';
const Signup = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup', values)
        .then(res => {
          navigate('/');
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
        <h2>Sign-Up</h2>
        <form action="/signup" method='post' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">Name:</label>
            <input type="text" placeholder='Enter Your Name' name='name' className='form-control rounded-0' onChange={handleInput} />
            {errors.name && <span className='text-danger'>{errors.name}</span>}
          </div>

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

          <button className='btn btn-success w-100'>Sign up</button>
          <p>You are agree to our terms and policies</p>
          <Link to="/" className=' btn btn-default border w-100'>Log in</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup