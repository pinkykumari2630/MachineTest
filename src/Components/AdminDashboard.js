import axios from 'axios';
import '../css/AdminDashboard.css';  
import { useNavigate } from 'react-router-dom'
import { message, message as MESSAGE,Modal } from "antd";
import React, { useEffect, useState } from 'react'
export const configJSON = require("./Config");

const AdminDashboard = () => {
    const navigate = useNavigate()
    const[data,setData]=useState([])
    const[userCount,setUserCount]=useState()
    const token=localStorage.getItem("token_authtoken")
  useEffect(()=>{
       axios({
        url:configJSON.baseUrl+configJSON.userList,
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
       }).then((res)=>{
        console.log(res?.data?.userList,"res?.data?.userList[0]...")
        if(res?.data?.status==true){
            MESSAGE.success(res?.data?.message)
            setData(res?.data?.userList,"res get api")
            setUserCount(res?.data?.userList.length);
        }
       })
  },[])

  const LogoutButton=()=>{
    
      axios({
        url:configJSON.baseUrl+configJSON.logout_api,
        method:"GET",
        headers: {Authorization: `Bearer ${token}`}
      }).then((res)=>{
        console.log(res,"res")
        if(res?.data?.status==true){
            MESSAGE.success(res?.data?.message)
            navigate("/")
        }
      })
      .catch((error) => {
        console.log(error) 
    })
  }
  const confirmLogout = () => {
    Modal.confirm({
        title: 'Confirm Logout',
        content: 'Are you sure you want to logout?',
        onOk: LogoutButton,
    });
};
  return (


<div className="container">
            <div className="sidebar">
                <h2 style={{color:"#a52a2a",textAlign:"canter",cursor: "pointer"}}>Sidebar</h2>
                <ul>
                    <li><a onClick={() => navigate("/dashboard/count", { state: { userList: data } })} style={{cursor:'pointer'}} >Dashboard Count</a></li>
                    <li><a onClick={() => navigate("/user/list")} style={{cursor:'pointer'}}>User List</a></li>
                </ul>
            </div>
            <div className="main-content">
                <h1 style={{color:"#a52a2a",textAlign:"canter",cursor:"pointer"}}>Admin Dashboard</h1>
                <h3 style={{color:"#a52a2a",textAlign:"right",cursor: "pointer"}} onClick={confirmLogout}>Logout</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ob, index) => (
                            <tr key={index}>
                                <td>{ob.id}</td>
                                <td>{ob.first_name}</td>
                                <td>{ob.email}</td>
                                <td>{ob.phone_no}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
  )
}

export default AdminDashboard





