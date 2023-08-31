import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../api/api'
import { useNavigate } from 'react-router-dom'
import { getLocal } from '../../helpers/auth'
import { Form } from 'react-bootstrap'

function Admin() {

  const [users,setUsers] = useState([])
  const history = useNavigate()
  const token = getLocal()

  async function getUserList(){
    const request = await axios.get(`${baseUrl}user-list/`)
    setUsers(request.data)
  }

  useEffect(()=>{
    if (!token){
      history('/')
    }
    getUserList()
  },[])

  const deleteUser = (id) =>{
    const user = axios.delete(`${baseUrl}user-detail/${id}/`).then(
    async function getUserList(){
      const request = await axios.get(`${baseUrl}user-list/`)
      setUsers(request.data)
    }
  )
  }

  // Edit User
  const EditFrom = async (index, e) => {
    const result = users.find((user, i) => i === index);
    e.preventDefault();
    const data = [
      e.target.username.value,
      e.target.email.value,
      e.target.password.value,
    ];
    if (data[0] ===''){
        data[0]=result.username
    }
    if (data[1] ===''){
        data[1]=result.email
    }
    if (data[2] ===''){
        alert("Please entr Old Password or New password")
        return
    }
    const id = result.id
    const response = await fetch(`${baseUrl}user-detail/${id}/`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'username': data[0],
          'email':data[1],
          'password':data[2],
        })
      });
      if (response.status === 400){
        alert(response.status)
        history('/admin')
        }else{
        getUserList();
        history('/admin')
        }
  };

  

  const logout = ()=>{
    localStorage.removeItem('authToken')
    history('/login')
  }

  const searchUser =  async (keyword) =>{
    if (!keyword == ''){
    const request = await axios.get(`${baseUrl}user-list/?search=${keyword}`)
    setUsers(request.data)
  }else{
    getUserList()
  }
  } 

  return (
    <div className='d-flex ' >
      <div className='vh-100 bg-dark px-3 pt-3' style={{width:'19%'}} >
      <button className='btn btn-outline-success'> <i className='fa fa-home' ></i> Home page</button>
      <button onClick={logout} style={{position:'fixed',bottom:20,left:30}} className='btn btn-danger mx-auto'> <i className='fa fa-exit' ></i> Logout </button>
      </div>
      <div className='m-4 w-75'>
      <div className='tabelHead d-flex justify-content-between align-items-center' >
        <h2>Users</h2>
        <input type="text" onChange={(e)=>searchUser(e.target.value)} className="form-control w-25 my-3" placeholder='Search here' />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">User Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">

          {
            users.length>0 ?
            users.map((user,idx)=>{
              return(
                <tr key={idx}>
                <th scope="row">{user.id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td> <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#exampleModal${idx}`}>Edit</button>
                        <div className="modal fade" id={`exampleModal${idx}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                            <Form onSubmit={(e) => EditFrom(idx, e)}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit User</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                           
                            <Form.Group className="py-2">
                            <Form.Control  type="text"  name="username" placeholder="Username" defaultValue={user.username} />
                            </Form.Group>
                            <Form.Group className="py-2">
                            <Form.Control type="email" name="email" placeholder="Email" defaultValue={user.email}/>
                            </Form.Group>
                            <Form.Group className="py-2">
                            <Form.Control type="password" name="password" placeholder="Password"/>
                            </Form.Group>
                           
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                            </Form>
                            </div>
                        </div>
                        </div></td>
                <td><button onClick={()=>deleteUser(user.id)} className='btn btn-sm btn-danger'style={{color:'white!important'}} >Delete</button></td>
              </tr>
              )
            })
            : <tr><td colSpan={3} ><h2>Users doesn't found</h2></td></tr>
          }
          
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default Admin;
