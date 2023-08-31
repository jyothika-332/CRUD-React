import React from 'react'
import { getLocal } from '../helpers/auth'
import Home from '../components/home/home'
import Login from './login/Login'
import Admin from './admin/Admin'
import jwt_decode from 'jwt-decode'

export function PrivateRoute() {

  let response = getLocal()

  if (response){
    const decoded = jwt_decode(response)
    
    if (decoded.is_admin){
        return <Admin/>
    }
    else{
        return <Home/>
    }

  }
  else{
      return <Login/>
  }
}


