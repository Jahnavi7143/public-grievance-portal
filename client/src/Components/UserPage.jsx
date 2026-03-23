import React from "react";
import UserNavbar from "./UserNavbar";

import Dashboard from "./Dashboard";
import UserProfile from "./UserProfile";
import UpdateUserProfile from "./UpdateUserProfile";
import FileNewGrievance from "./FileNewGrievance";
import MyGrievance from "./MyGrievance";
import Footer from "./Footer";
export default function UserPage(){
  if(localStorage.getItem("token")==null){
  
    window.location.href="/userlogin"
  }
  const token=localStorage.getItem("token")
  // axios.get(api, { headers: {"Authorization" : `Bearer ${token}`} })
  //       .then(res => {
  //           console.log(res.data);
  //       this.setState({
  //           items: res.data,  /*set response data in items array*/
  //           isLoaded : true,
  //           redirectToReferrer: false
  //       })
  //     })
    const [isClicked,setIsClicked]=React.useState("1")
    function handleClick(val,vis){
        setIsClicked(val)
        setVisible(vis)
    }
    const[visible,setVisible]=React.useState("profile")
   return (
    <div className={`min-h-screen bg-slate-50 font-sans flex flex-col ${token == null ? "hidden" : ""}`}>
      {/* Top Navigation */}
      <UserNavbar
        first="HOME"
        second="GRIEVANCE"
        third="NEW"
        fourth="UPDATE PROFILE"
        handle={handleClick}
      />
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col md:flex-row relative items-stretch">
        <Dashboard
          clicked={isClicked}
          visible={visible}
          handle={handleClick}
          first="HOME"
          second="MY GRIEVANCE"
          third="NEW GRIEVANCE"
          fourth="UPDATE PROFILE"
        />
        
        {/* Content Container */}
        <div className="flex-1 overflow-x-hidden p-6 md:p-10 bg-slate-50">
           <UserProfile
             visible={visible}
             uName={"Vishesh Vijayvargiya"}
             mail={"iit2021114@iiita.ac.in"}
             contact={"0123456789"}
             address={"PLOT NO-2,EAST VINOD NAGAR, DELHI"}
           />
           <FileNewGrievance visible={visible} />
           <MyGrievance visible={visible} />
           <UpdateUserProfile visible={visible} />
        </div>
      </div>
      
      <Footer />
    </div>
   ); 
}