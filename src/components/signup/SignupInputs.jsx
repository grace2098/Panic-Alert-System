import React from "react";

const SignupInputs = ({ formData, errors, handleChange }) => {
  return (
    <div className="flex flex-col w-full  gap-1">
     
        <label className="text-label-sm font-medium text-slate-700">
          FULL NAME
        </label>
        <input
          className={errors.fullname ? "bg-surface text-sm max-w-full border border-red-500 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-red-200" : "bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"}
          type="text"
          placeholder="Jane Doe"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
        />
        {errors.fullname && (
          <p className=" text-xs text-red-500 mb-1.5">{errors.fullname}</p>
        )}
        <label className="text-label-sm font-medium text-slate-700">
          EMAIL
        </label>
        <input
          className={errors.email ? "bg-surface text-sm max-w-full border border-red-500 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-red-200" : "bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"}
          type="email"
          placeholder="jane.doe@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className=" text-xs text-red-500 mb-1.5">{errors.email}</p>
        )}
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-label-sm font-medium text-slate-700">
              PASSWORD
            </label>
            <input
              className={errors.password ? "bg-surface text-sm max-w-full border border-red-500 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-red-200" : "bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"}
              type="password"
              placeholder="*********"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
            <p className=" text-xs text-red-500 mb-1.5">{errors.password}</p>
          )}
          </div>
          
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <label className="text-label-sm font-medium text-slate-700">
              CONFIRM PASSWORD
            </label>
            <input
              className={errors.confirmPassword ? "bg-surface text-sm max-w-full border border-red-500 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-red-200" : "bg-surface p-2 text-sm mb-1.5 max-w-full border border-slate-200 text-slate-700 placeholder:text-slate-400 rounded-lg px-3 py-2.5 focus:outline-none focus-within:ring-2 focus-within:ring-green-700 focus-within:border-transparent"}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="*********"
            />
            {errors.confirmPassword && (
              <p className=" text-xs text-red-500 mb-1.5">{errors.confirmPassword}</p>
            )}
          </div>
          
        </div>
       
    </div>
  );
};

export default SignupInputs;
