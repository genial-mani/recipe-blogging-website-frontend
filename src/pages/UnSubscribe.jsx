import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SuccessToast from '../components/SuccessToast';

const UnSubscribe = () => {
  const [email,setEmail] = useState("");
  const [error,setError] = useState('');
  const [successMsg,setSuccessMsg] = useState('');

  const handleSubscribe = async (e)=>{
    e.preventDefault();
    setError('')
    setSuccessMsg('')
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/unsubscribe`,{data: {email}});
      setSuccessMsg(response?.data);
    } catch (error) {
      setError(error.response?.data?.message);
    }

  }

  const inputHandler = (e)=>{ 
    setEmail(e.target.value);
  }

  useEffect(()=>{
    console.log(email)
  },[email])

  return (
    <section className='mt-16'>
        <div className='subscribe-form-div flex items-center justify-center'>
            <form onSubmit={handleSubscribe} className='subscribe-form flex flex-col gap-3'>
              <input type="text" value={email} onChange={inputHandler} placeholder='Enter your email.' required />
              {error && <p className='text-red-800'>{error}</p>}
              {successMsg && <SuccessToast message={successMsg}/>}
              <button>Unsubscribe</button>
            </form>
        </div>
    </section>
  )
}

export default UnSubscribe