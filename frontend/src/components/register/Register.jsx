import './register.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl } from '../../api/api'


function Register() {

  const history = useNavigate()

  const signupSubmit = async (e) => {
    e.preventDefault()

    const data = [e.target.username.value,
                  e.target.email.value,
                  e.target.password.value,
                  e.target.confirmPassword.value
                ]

    for(let i=0;i<data.length;i++){
      if (data[i] == ''){
        alert(`Fields never be empty`)
        return
      }
    }

    if(!(data[2]==data[3])){
      alert("Password doesn't match")
      return
    }

    if(data[2].length<6){
      alert("Password atleast have 6 characters")
      return
    }

    const response = await fetch(`${baseUrl}user-register/`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'username':data[0],
        'email':data[1],
        'password':data[2]
      })
    })
    
    if(response.status === 400){
      alert(response.statusText)
      history('/register')
    }else{
      history('/')
    }    
    
  }


  return (
          <section className="vh-100 bg-image">
          <div className="mask d-flex align-items-center h-100">
            <div className="container h-75">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6 d-flex justify-content-center">
                  <div className="card" style={{borderRadius: "15px",width:"80%"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                      <form onSubmit={(e)=>signupSubmit(e)}>

                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form3Example1cg">Username</label>
                          <input type="text" name='username' id="form3Example1cg" className="form-control form-control-lg" />
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form3Example3cg">Your Email</label>
                          <input type="email" name='email' id="form3Example3cg" className="form-control form-control-lg" />
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form3Example4cg">Password</label>
                          <input type="password" name='password' id="form3Example4cg" className="form-control form-control-lg" />
                        </div>

                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="form3Example4cdg">Repeat your password</label>
                          <input type="password" name='confirmPassword' id="form3Example4cdg" className="form-control form-control-lg" />
                        </div>


                        <div className="d-flex justify-content-center">
                          <button type="submit"
                            className="btn btn-success btn-block btn-lg text-body">Register</button>
                        </div>

                        <p className="text-center text-muted mt-4 mb-0">Have already an account? <a href="#!"
                            className="fw-bold text-body"><u onClick={()=>history('/login')} >Login here</u></a></p>

                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
  )
}

export default Register
