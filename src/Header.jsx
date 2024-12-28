import React from 'react'
import './index.css'
import headerimg from './assets/headerimg.png'

function Header() {
  return (
    <div className='header-logo'>
       <img src={headerimg} alt=""/>
       <h4>FindWeather</h4>
    </div>
  )
}

export default Header