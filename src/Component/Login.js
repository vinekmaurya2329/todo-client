import React, { useState } from 'react'
import axios  from 'axios';
import Swal from 'sweetalert2';

 
 
function Login() {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');


    async function loginSubmit(e){
        e.preventDefault()
       const users = await axios.post('http://localhost:4000/login',{email:email,password:password})
        localStorage.setItem('user',JSON.stringify(users.data.user))
       Swal.fire(`${users.data.ft}`,`${users.data.message}`,`${users.data.lt}`)
      if(users.data.lt == 'success') window.location.href = '/lists'
    }
  return (
    <div className='login-container'>
        <form onSubmit={loginSubmit}> 
            <div className="login2-container">
              <h2 className='login-caption'>Login</h2><br />
               <input type="text" placeholder=' enter your  email' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password"  placeholder=' enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                <input type="submit"  className='login-button' value="Login" />
                 <a href="/register">if not registered Click here</a>
            </div>
        </form>
    </div>
   
  )
}

export default Login