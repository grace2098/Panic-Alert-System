export default function LoginHeader() {
  return (
    <div className="bg-[#eef2ec] rounded-t-2xl px-5 sm:px-6 pt-6 sm:pt-8 pb-4 text-center">
      <div className="flex justify-center mb-3">
        <img
          src="/sentinoalogo.png"
          alt="Sentinoa Logo"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover"
        />
      </div>
      <h1 className="text-xl sm:text-2xl font-extrabold text-green-800 tracking-wide">
        SENTINOA
      </h1>
      <p className="text-xs text-slate-600 mt-1">UNN Security Device Portal</p>
    </div>
  );
}
