import React from 'react'
import { useLocation } from 'react-router-dom';
const DashboardCount = () => {
    const location = useLocation();
    const { userList } = location.state || { userList: [] };
  return (
    <div style={{color:"#a52a2a",textAlign:"center"}}>
      <h1>Dashboard Count</h1>
      {/* <h1>Total Users: {userCount}</h1> */}
      <p style={{fontSize:"25px"}}>Total Users: {userList.length}</p>


    </div>
  )
}

export default DashboardCount
