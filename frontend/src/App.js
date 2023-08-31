import { Route, Routes } from 'react-router-dom';
import './App.css';
import login from './components/login/Login'
import Register from './components/register/Register'
import admin from './components/admin/Admin'
import UserProfile from './components/profile/Userprofile'
import {PrivateRoute} from './components/PrivateRoute';


function App() {

  return (
    <div>
      <Routes>
        <Route Component={PrivateRoute} path='/' />
        <Route Component={UserProfile} path='/profile' />
        <Route Component={login} path='/login' />
        <Route Component={Register} path='/register' />
        <Route Component={admin} path='/admin' />
      </Routes>
    </div>
  )
}

export default App;
