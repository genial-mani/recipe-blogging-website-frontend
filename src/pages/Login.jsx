import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import axios from 'axios'
import ErrorCompo from '../components/ErrorCompo'
import Loader from '../components/Loader'

const Login = () => {
const [userData, setUserData] = useState({
  email: "",
  password: "",
});
const [isLoading,setIsLoading] = useState(false);

const [error, setError] = useState('')
const navigate = useNavigate()

const {setCurrentUser} = useContext(UserContext)

const changeInputHandler = (e) =>{
  setUserData((prevState) =>{
    return { ...prevState, [e.target.name]: e.target.value};
  });
};


const loginUser = async (e)=>{
  e.preventDefault();
  setError('')
  setIsLoading(true)
  try {

    console.log(`${process.env.REACT_APP_BASE_URL}/users/login`);
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`,userData);
    console.log(response)
    const user = await response.data;
    setCurrentUser(user)
    setIsLoading(false)
    navigate('/')
  } catch (error) {
    setError(error.response.data.message)
    setIsLoading(false)
  }
}

if(isLoading){
  return <Loader/>
}

  return (
    <div className='mt-16'>
      <div className="container bg-slate-600 flex flex-col justify-center items-center" >
      <div className='wrapper flex flex-col justify-center items-center py-5 rounded-md'>
      <h2 className='text-2xl'>Sign In</h2>
        <form className="flex flex-col gap-10 items-center mt-10" onSubmit={loginUser}>
          {error && <ErrorCompo err={error} />}
          <input
          className='bg-transparent'
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            autoFocus
          />
          <input
          className='bg-transparent'
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <small>
          Don't have an account? <Link to="/register">Sign up</Link>
        </small>
      </div>
      </div>
    </div>
  )
}

export default Login         