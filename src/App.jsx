import { useState } from 'react'
import Navebar from "./components/Navebar"
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'

function App() {

  const[isLogin,setisLogin] = useState(false);

  return (
    <div className=' bg-slate-950 w-screen min-h-screen flex flex-col'>
      <Navebar isLogin={isLogin} setisLogin={setisLogin}/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setisLogin={setisLogin}/>}/>
        <Route path='/signup' element={<Signup setisLogin={setisLogin}/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </div>
    
  )
}

export default App
