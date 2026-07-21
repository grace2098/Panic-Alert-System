
import React, { useState } from "react";
import {
  ShieldCheck,
  BatteryCharging,
  Timer,
  BellRing,
  Radio,
  MessageSquare,
  CheckCheck,
  RefreshCw,
  X,
} from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex  ">
     <Sidebar />

    </div>
  )
}

export default Dashboard
