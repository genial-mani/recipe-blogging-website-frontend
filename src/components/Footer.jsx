import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/icons8-chef-hat-100.png'

const Footer = () => {
  return (
    <div className='mt-0 footer-div flex flex-row justify-between items-center flex-wrap'>
      <div className='subscribe-div flex items-center justify-center gap-10'>
        <Link to={'/'}>
          <img src={logo} alt="site-logo" />
        </Link>
        <Link to={'/subscribe'}>
        <button>Subscribe</button>
        </Link>
      </div>
      <div className='logo-links-div flex flex-col gap-3'>
        <ul className='flex items-center flex-col gap-3'>
          <Link>Privacy Policy</Link>
          <Link>Terms & conditions</Link>
          
          <Link to={'/unsubscribe'}>Unsubscribe</Link>
        </ul>
      </div>
    </div>
  )
}

export default Footer