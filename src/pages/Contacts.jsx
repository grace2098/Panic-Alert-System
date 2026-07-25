
import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Footer from '../components/layout/Footer'
import Header from "../components/layout/Header";
const Contacts = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex  ">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
     <div className="w-full">
      <div className="fixed top-0 left-0 z-10 right-0 lg:left-62.5">
          <Header onMenuClick={() => setSidebarOpen(true)} writings={["Your Contacts","Have your people an sms away"]}/>
        </div>
      <div
          className="fixed bottom-0 left-0 right-0 z-10
            flex justify-center items-center
            lg:left-62.5"
        >
          <Footer />
        </div>
     </div>
    </div>
  )
}
export default Contacts
