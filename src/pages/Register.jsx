import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorCompo from '../components/ErrorCompo';
const Register = () => {
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userdata
      );
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      }
      navigate("/login");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className='mt-16'>
      <div className="container bg-slate-600 flex flex-col justify-center items-center" >
      <div className='wrapper flex flex-col justify-center items-center py-5 rounded-md'>
      <h2 className='text-2xl'>Sign Up</h2>
      <form className="flex flex-col gap-10 items-center mt-10" onSubmit={registerUser}>
          {error && <ErrorCompo err={error} />}
          <input
          className='bg-transparent'
            type="text"
            placeholder="Full Name"
            name="name"
            value={userdata.name}
            onChange={changeInputHandler}
          />
          <input
          className='bg-transparent'
            type="text"
            placeholder="Email"
            name="email"
            value={userdata.email}
            onChange={changeInputHandler}
          />
          <input
          className='bg-transparent'
            type="password"
            placeholder="Password"
            name="password"
            value={userdata.password}
            onChange={changeInputHandler}
          />
          <input
          className='bg-transparent'
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userdata.password2} 
            onChange={changeInputHandler}
          />
          <button type="submit" className="register-btn mb-2">
            Register
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/login">Sign in</Link>
        </small>
        </div>
      </div>
    </div>
  )
}

export default Register