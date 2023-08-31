import { useNavigate } from 'react-router-dom'
import './navbar.css'

import React from 'react'

function Navbar({heading,homeIcon}) {
  const history = useNavigate()

  const logout = ()=>{
    localStorage.removeItem('authToken')
    history('/login')
  }

  const gotoProfile = () =>{
    history('/profile')
  }

  return (
    <div style={{zIndex:999}} className='navbar-container d-flex justify-content-between' >
        <div className='d-flex justify-content-between align-items-center' >
        {
          homeIcon &&
          <span><i onClick={()=>history('/')} style={{fontSize:23,cursor:'pointer'}} className='fa fa-home mx-3'></i></span>
        }
        <h2>{heading}</h2>
        </div>
        <div>
        <button onClick={gotoProfile} className='btn btn-light px-3 mx-3' > <i className='fa fa-user'></i></button>
        <button onClick={logout} className='btn btn-warning' > <i className='fa fa-exit' ></i> Logout </button>
        </div>
    </div>
  )
}

export default Navbar
