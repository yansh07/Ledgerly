function HeroSection() {
  return (
    <div>
        <div className="md:pt-24 pt-16 text-center">
            <h1 className="text-gray-100 px-2 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">Take <span className="bg-gradient-to-r from-orange-700 to bg-yellow-600 rounded-xl px-4 py-1">control</span> of your monthly <span className="bg-gradient-to-r from-orange-700 to bg-yellow-600 rounded-xl px-4 py-1">spending</span><br></br>Master your <span className="bg-gradient-to-r from-orange-700 to bg-yellow-600 rounded-xl px-4 py-1">expenses</span></h1>
            <div className="border-[0.5px] border-yellow-700 mt-8"/>
            <p className="text-gray-300 mt-8 font-normal text-2xl px-3 md:text-4xl leading-normal">A minimal expense tracker built with React, FastAPI and PostgreSQL. <span className="border-b-2 border-orange-600">Secure, fast, and distraction-free.</span></p>

            {/* button  */}
            <div>
                {/* login button  */}
                <div className="text-gray-300 md:space-x-24 space-x-12 pt-16">
                    <button className="border px-6 hover:shadow-sm hover:transition-all hover:duration-500 shadow-gray-300 py-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 text-2xl font-bold border-transparent"><a href="/login">Login</a></button>
                    <button className="border px-6 hover:shadow-sm hover:transition-all hover:duration-500 shadow-gray-300 py-2 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 text-2xl font-bold border-transparent"><a href="/signup">Sign up</a></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection