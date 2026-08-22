import React from 'react'
import Logo from '../components/layout/Logo'
// import LoginHeader from '../components/login/LoginHeader'
import Loginform from '../components/login/Loginform'
import Footer from '../components/layout/Footer'

const LoginPage = () => {
  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-between gap-6 px-6 ">
      <Logo />
      <Loginform />
      <Footer />
    </div>
  )
}

export default LoginPage
