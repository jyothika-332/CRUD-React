import { useNavigate } from 'react-router-dom'
import './login.css'
import React, { useEffect } from 'react'
import { baseUrl } from '../../api/api'
import { getLocal } from '../../helpers/auth'

function Login() {

  const history = useNavigate()
  const response = getLocal();
  
  useEffect(()=>{
    if (response) {
      history('/')
    }
  })

  const signupSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(`${baseUrl}token/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'email':e.target.email.value,
          'password':e.target.password.value
        })
      })

      let data = await response.json()
      if(response.status === 200){
        localStorage.setItem('authToken', JSON.stringify(data))
        history('/')
    }else if(response.status === 401){
      alert('User credentials mismatch')
      history('/')

  }
}
  return (
    <div>
        <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-75">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex justify-content-center">
                  <div className="card" style={{borderRadius: "15px",width:"80%"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Login Here</h2>

                      <form onSubmit={(e)=>signupSubmit(e)} >

                        <div className="form-outline mb-2">
                          <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                        </div>

                        <div className="form-outline mb-2">
                          <input name='password' type="password" id="form3Example4cg" className="form-control form-control-lg" />
                          <label className="form-label" htmlFor="form3Example4cg">Password</label>
                        </div>


                        <div className="d-flex justify-content-center">
                          <button type="submit"
                            className="btn btn-success btn-block btn-lg text-body">Login</button>
                        </div>

                        <p className="text-center text-muted mt-4 mb-0">Don't yet registered? <a href="#!"
                            className="fw-bold text-body"><u onClick={()=>history('/register')} >SignUp here</u></a></p>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default Login
