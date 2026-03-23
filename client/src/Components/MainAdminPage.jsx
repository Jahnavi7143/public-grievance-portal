import React from 'react'
import UserNavbar from "./UserNavbar";
import Dashboard from "./Dashboard";
import Footer from "./Footer";
import MainAdminProfile from './MainAdminProfile';
import ViewOfficerDetails from './ViewOfficerDetails';
import AddNewOfficer from './AddNewOfficer';
export default function MainAdminPage() {
    const token=localStorage.getItem("token")
    const [isClicked, setIsClicked] = React.useState("1");
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);
    function handleClick(val, vis) {
      setIsClicked(val);
      setVisible(vis);
    }
    
    function handleOfficerSuccess() {
      setRefreshTrigger(prev => prev + 1);
      handleClick("2", "view");
    }
    if (localStorage.getItem("token") == null) {
      window.location.href = "/userlogin";
    }
   const [visible, setVisible] = React.useState("profile"); 
  return (
    <div className={`min-h-screen bg-slate-50 font-sans flex flex-col ${token == null ? "hidden" : ""}`}>
      {/* Top Navigation */}
      <UserNavbar
        first="HOME"
        second="OFFICERS"
        third="NEW OFFICER"
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
          second="OFFICERS DETAILS"
          third="NEW OFFICER"
          fourth=""
        />
        
        {/* Content Container */}
        <div className="flex-1 overflow-x-hidden p-6 md:p-10 bg-slate-50">
          <MainAdminProfile visible={visible} />
          <ViewOfficerDetails visible={visible} refreshTrigger={refreshTrigger} />
          <AddNewOfficer visible={visible} onSuccess={handleOfficerSuccess} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
