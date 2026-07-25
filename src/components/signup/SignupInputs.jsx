import React from 'react'

const SignupInputs = () => {
  return (
    <div>
      <form className="flex flex-col gap-2">
        <label className="text-label-sm font-medium text-on-surface">FULL NAME</label>
        <input className="bg-surface h-10 p-5 text-md border w-full border-outline-variant rounded  focus:outline-none
             focus:border-teal-500" type="text" placeholder="Jane Doe" />
        <label className="text-label-sm font-medium text-on-surface">EMAIL</label>
        <input className="bg-surface h-10 p-5 text-md border w-full border-outline-variant rounded  focus:outline-none
             focus:border-teal-500" type="email" placeholder="jane.doe@example.com" />
        <div className="flex flex-col sm:flex-row justify-between gap-2">
            <div className="flex flex-col gap-2 w-full">
                <label className="text-label-sm font-medium text-on-surface">PASSWORD</label>
                <input className="bg-surface h-10 p-5 border w-full text-md border-outline-variant rounded  focus:outline-none
             focus:border-teal-500 w-full" type="password" placeholder="*********" />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="text-label-sm font-medium text-on-surface">CONFIRM PASSWORD</label>
                <input className="bg-surface h-10 p-5 text-md border w-full border-outline-variant rounded  focus:outline-none
             focus:border-teal-500 w-full" type="password" placeholder="*********" />
            </div>
        </div>
        <label className="text-label-sm font-medium text-on-surface">DEVICE ID</label>
        <input className="bg-surface h-10 p-5 text-md border w-full border-outline-variant rounded  focus:outline-none
             focus:border-teal-500" type="text" placeholder="VX-WXX-WXX" />
      </form>
    </div>
  )
}

export default SignupInputs
