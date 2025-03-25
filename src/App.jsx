import { useEffect, useState } from 'react'
import Navebar from "./components/Navebar"
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Privateroute from './components/Privateroute'
import OTPpage from './pages/OTPpage'
import PaymentComponent from './pages/Payments'

function App() {

  const[isLogin,setisLogin] = useState(false);
  const navigate = useNavigate();
    // helps to get the current path of the url
  const currentPath = useLocation();

  useEffect(() => {
    // Check if token exists in localStorage(User is Loged in or Not)
    const token = localStorage.getItem("authToken");
    console.log(`Useeffect Token ${token}`);
    if (token) {
        setisLogin(true);  // Keep the user logged in
        // console.log(currentPath);
        navigate(currentPath.pathname); // remain to the Current path 
    } else {
        setisLogin(false);  // Force login if no token
        navigate("/login"); // Redirect to login page
    }
}, []);


  

  return (
    <div className=' bg-slate-950 w-screen min-h-screen flex flex-col'>
      <Navebar isLogin={isLogin} setisLogin={setisLogin} currentPath={currentPath}/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setisLogin={setisLogin}/>}/>
        <Route path='/signup' element={<Signup setisLogin={setisLogin}/>} />
        <Route path='/otpverify' element={<OTPpage setisLogin={setisLogin}/>} />
        <Route path='/dashboard' element={
          <Privateroute isLogin={isLogin}>
            <Dashboard/>
          </Privateroute>
        } />
        <Route path='/payment' element={
          <Privateroute isLogin={isLogin}>
            <PaymentComponent/>
          </Privateroute>
        } />

        
      </Routes>
    </div>
    
  )
}

export default App
