import { useNavigate } from 'react-router-dom'
import { message, message as MESSAGE } from "antd";
import axios from 'axios'
import React, { useEffect, useState } from 'react'
export const configJSON = require("./Config");
const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const LoginButton = () => {
    if (email && password) {
      const data = {
        email: email,
        password: password
      }
      axios({
        url: configJSON.baseUrl + configJSON.login_api,
        method: "POST",
        data: data
      }).then((res) => {
        console.log(res, "res")
        // console.log(res.data?.record?.authtoken,"authtoken")
        // localStorage.setItem("token_authtoken",res?.data?.record?.authtoken)
        if (res?.data?.status == true) {
          MESSAGE.success(res?.data?.message)
          console.log(res.data.message,"message")
          setEmail("")
          setPassword("")
          localStorage.setItem("token_authtoken",res?.data?.record?.authtoken)
          console.log(res.data?.record?.authtoken,"res.data?.record?.authtoken")
          navigate("/admin/dashboard")
        }
        else {
          MESSAGE.error(res?.data?.message)
        }
        
      })
      .catch((error) => {
        console.log(error)
        setPassword("")
        setEmail("")
    })
      
    }
    else {
      MESSAGE.error("Field can not be empty!")

    }
  }
  return (
    <div>
      <div>
        <h1 style={{color:"#a52a2a", textAlign:"center"}}>Login</h1>
        <div style={{textAlign:"center",fontSize:"25px"}}>
        <input type='email' placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        <input type='password' placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} value={password} />
        <button onClick={LoginButton} className='btn btn-success'>Login</button>
        <p>Don't have an account? <a style={{ color: "#0d6efd" }} onClick={() => navigate("/signup")}>Sign up</a></p>

        </div>
        
      </div>
    </div>
  )
}

export default Login
