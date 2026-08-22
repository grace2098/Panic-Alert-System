import React from "react";

const SignupInputs = () => {
  return (
    <div>
      <form className="flex flex-col w-full  gap-1">
        <label className="text-label-sm font-medium text-slate-700">
          FULL NAME
        </label>
        <input
          className="bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 
          focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
          type="text"
          placeholder="Jane Doe"
        />
        <label className="text-label-sm font-medium text-slate-700">
          EMAIL
        </label>
        <input
          className="bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 
          focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
          type="email"
          placeholder="jane.doe@example.com"
        />
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-label-sm font-medium text-slate-700">
              PASSWORD
            </label>
            <input
              className="bg-surface w-full max-w-full p-2 text-sm mb-1.5 border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 
              focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
              type="password"
              placeholder="*********"
            />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-label-sm font-medium text-slate-700">
              CONFIRM PASSWORD
            </label>
            <input
              className="bg-surface w-full max-w-full p-2 text-sm mb-1.5 border  border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 
              focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
              type="password"
              placeholder="*********"
            />
          </div>
        </div>
        <label className="text-label-sm font-medium text-slate-700">
          DEVICE ID
        </label>
        <input
          className="bg-surface text-sm mb-1.5 p-2 border max-w-full border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 
          focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"
          type="text"
          placeholder="VX-WXX-WXX"
        />
      </form>
    </div>
  );
};

export default SignupInputs;
