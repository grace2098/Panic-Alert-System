import React from 'react'

const SignupInputs = () => {
  return (
    <div>
      <form className="flex flex-col gap-2">
        <label className=" text-gray-600 text-sm">FULL NAME</label>
        <input className="bg-surface h-10 p-3 border border-outline-variant rounded" type="text" placeholder="Jane Doe" />
        <label className=" text-gray-600 text-sm">EMAIL</label>
        <input className="bg-surface h-10 p-3 border border-outline-variant rounded" type="email" placeholder="jane.doe@example.com" />
        <div className="flex justify-between gap-2">
            <div className="flex flex-col gap-2">
                <label className=" text-gray-600 text-sm">PASSWORD</label>
                <input className="bg-surface h-10 p-3 border border-outline-variant rounded w-full" type="password" placeholder="*********" />
            </div>
            <div className="flex flex-col gap-2">
                <label className=" text-gray-600 text-sm">CONFIRM PASSWORD</label>
                <input className="bg-surface h-10 p-3 border border-outline-variant rounded w-full" type="password" placeholder="*********" />
            </div>
        </div>
        <label className=" text-gray-600 text-sm">DEVICE ID</label>
        <input className="bg-surface h-10 p-3 border border-outline-variant rounded" type="text" placeholder="VX-WXX-WXX" />
      </form>
    </div>
  )
}

export default SignupInputs
