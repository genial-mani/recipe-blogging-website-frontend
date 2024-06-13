import React from 'react'
import {ScaleLoader} from "react-spinners";

const Loader = () => {
  return (
    <div className='mt-16 loader-container flex items-center justify-center pb-16'>
        <ScaleLoader color="#fca311" />
    </div>
  )
}

export default Loader