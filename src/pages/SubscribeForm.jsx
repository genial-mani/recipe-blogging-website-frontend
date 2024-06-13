import axios from 'axios';
import React, { useState } from 'react'
import SuccessToast from '../components/SuccessToast';
import Loader from '../components/Loader';

const SubscribeForm = () => {
  const [email,setEmail] = useState("");
  const [error,setError] = useState('');
  const [successMsg,setSuccessMsg] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const handleSubscribe = async (e)=>{
    e.preventDefault();
    setError('')
    setSuccessMsg('')
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/subscribe`,{email});
      setSuccessMsg(response?.data);
      setIsLoading(false);
    } catch (error) {
      setError(error.response?.data?.message);
      setIsLoading(false);
    }

  }

  const inputHandler = (e)=>{ 
    setEmail(e.target.value);
  }

  // useEffect(()=>{
  //   console.log(email)
  // },[email])

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className='mt-16'>
        <div className='subscribe-form-div flex items-center justify-center'>
            <form onSubmit={handleSubscribe} className='subscribe-form flex flex-col gap-3'>
              <input type="email" value={email} onChange={inputHandler} placeholder='Enter your email.' required />
              {error && <p className='text-red-800'>{error}</p>}
              {successMsg && <SuccessToast message={successMsg}/>}
              <button>Subscribe</button>
            </form>
        </div>
    </section>
  )
}

export default SubscribeForm