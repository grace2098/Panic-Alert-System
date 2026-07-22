import React from 'react'
import Logo from '../components/layout/Logo'
import SignupContainer from '../components/signup/SignupContainer'
import Footer from '../components/layout/Footer'
const Signup = () => {
  return (
    <div className="bg-[#eff5ec] flex flex-col items-center justify-center gap-4 py-6 ">
      <Logo />
      <SignupContainer />
      <Footer />
    </div>
  )
}

export default Signup
