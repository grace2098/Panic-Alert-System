
import React, { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Footer from '../components/layout/Footer'
import Header from "../components/layout/Header";
import Dashboardcontainer from "../components/dashboard/Dashboardcontainer";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex  ">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
     <div className="w-full">
      <div className="fixed top-0 left-0 z-10 right-0 lg:left-62.5">
          <Header onMenuClick={() => setSidebarOpen(true)} writings={["Hello","Get all your security details in one go"]}/>
        </div>
       <div className="pt-20 pb-35 lg:pt-24">
         <Dashboardcontainer />
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

export default Dashboard
