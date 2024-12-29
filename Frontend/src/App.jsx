import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Page/Start'
import UserLogin from './Page/UserLogin'
import UserSignup from './Page/UserSignup'
import CaptainSignup from './Page/CaptainSignup'
import Captainlogin from './Page/Captainlogin'
import UserProtectWrapper from './Page/UserProtectWrapper'
import UserLogout from './Page/UserLogout'
import Home from './Page/Home'
import CaptainProtectWrapper from './Page/CaptainProtectWrapper'
import CaptainHome from './Page/CaptainHome'
import CaptainLogout from './Page/CaptainLogout'


const App = () => {
  return (
    <div >
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>

          } />
          <Route path='/captain/logout' element={
            <CaptainProtectWrapper>
              <CaptainLogout />
            </CaptainProtectWrapper>
          } />
      </Routes>
    </div>
  )
}
export default App
