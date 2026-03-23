import React from "react";
import UserNavbar from "./UserNavbar";
import Dashboard from "./Dashboard";
import AdminProfile from "./AdminProfile";
import GrievanceStatus from "./GrievanceStatus";
import UpdateStatus from "./UpdateStatus"
import UpdateAdminProfile from "./UpdateAdminProfile";
import Footer from "./Footer";
import ErrorBoundary from "./ErrorBoundary";
export default function AdminPage(){
    const [isClicked,setIsClicked]=React.useState("1")
    function handleClick(val,vis){
        setIsClicked(val)
        setVisible(vis)
    }
    if (localStorage.getItem("token") == null) {
      window.location.href = "/userlogin";
    }
    
    const token=localStorage.getItem("token")
    const[visible,setVisible]=React.useState("profile")
   return (
    <div className={`min-h-screen bg-slate-50 font-sans flex flex-col ${token == null ? "hidden" : ""}`}>
      {/* Top Navigation */}
      <UserNavbar
        first="HOME"
        second="STATUS"
        third="UPDATE"
        fourth=""
        handle={handleClick}
      />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row relative items-stretch">
        <Dashboard
          clicked={isClicked}
          visible={visible}
          handle={handleClick}
          first="HOME"
          second="GRIEVANCES STATUS"
          third="UPDATE STATUS"
          fourth=""
        />
        
        {/* Content Container */}
        <div className="flex-1 overflow-x-hidden p-6 md:p-10 bg-slate-50">
          <ErrorBoundary><AdminProfile visible={visible} /></ErrorBoundary>
          <ErrorBoundary><GrievanceStatus visible={visible} /></ErrorBoundary>
          <ErrorBoundary><UpdateStatus visible={visible} /></ErrorBoundary>
        </div>
      </div>
      
      <Footer />
    </div>
   ); 
}