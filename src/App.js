
import Login from './Components/Login';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from './Components/Register';
import Home from './Components/Home';
import AdminDashboard from './Components/AdminDashboard';
import DashboardCount from './Sidebar/DashboardCount';
import UserList from './Sidebar/UserList';
import { Pagination } from 'antd';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/signup' element={<Register/>}/>
          <Route exact path='/home' element={<Home/>}/>
          <Route exact path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route exact path='/dashboard/count' element={<DashboardCount/>}/>
          <Route exact path='/user/list' element={<UserList/>}/>
          <Route exact path='/pagination' element={<Pagination/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
