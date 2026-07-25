import React from 'react'
import Logo from '../components/layout/Logo'
import SignupContainer from '../components/signup/SignupContainer'
import Footer from '../components/layout/Footer'
const Signup = () => {
  return (
    <div className="bg-surface min-h-screen flex flex-col items-center justify-between gap-6 px-6 ">
      <Logo />
      <SignupContainer />
      <Footer />
    </div>
  )
}

export default Signup
