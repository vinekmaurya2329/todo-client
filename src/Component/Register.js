import React, { useState } from 'react'
import axios from 'axios';
import Swal from  'sweetalert2';
import '../../src/App.css'
function Register() {

    const [name,setName] = useState('')
    const [email,setEmail]= useState('')
    const [number,setNumber] = useState('')
    const [password , setPassword]= useState('')
     async function submit(e){
        e.preventDefault()

         const  users = await  axios.post('https://todoapi-2t85.onrender.com/register',{name:name,email:email,number:number,password:password})
          Swal.fire(`${users.data.ft}`,`${users.data.message}`,`${users.data.lt}`)
         console.log(users);
         localStorage.setItem('user',JSON.stringify(users.data.user));
         if(users.data.lt == 'success') window.location.href = '/login'
    }
  return (
    <div className='register-container'>
      <div className='main-caption'><h1>Register for use Todo</h1></div>
      <form onSubmit={submit}>
      <div className='input-container'>
        <input type="text" placeholder='name'  onChange={(e)=>setName(e.target.value)}/><br />
        <input type="text" placeholder='email' onChange={(e)=>setEmail(e.target.value)}/><br />
        <input type="text" placeholder='number'  onChange={(e)=>setNumber(e.target.value)}/><br />
        <input type="password" placeholder='create password'  onChange={(e)=>setPassword(e.target.value)}/><br />
 <input type="submit" className='button-submit' value="Register" />
 <a href="/login">if already registered please login</a>
       </div>
      </form>

    </div>
  )
}

export default Register