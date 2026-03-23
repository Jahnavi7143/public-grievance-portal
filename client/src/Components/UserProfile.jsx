import React from "react";
import pfp from "../Images/pfp.png"
import axios from "axios";
import { useNavigate } from "react-router";
import Loading from "./Loading";
export default function UserProfile(props){
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/user",
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  };
  const [userData,setUserData]=React.useState({})
  React.useEffect(() => {
  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setUserData(response.data.user)
      setLoading(false);
      
    })
    .catch((error) => {
      console.log(error);
      alert("Error Occured")
    });
  }, [])
  const navigate=useNavigate()
  function checkLogin(){
    if(!token){
      navigate("/userAdminLogin")
    }
  }
  const [loading, setLoading] = React.useState(true);
   return (
    <>
      {checkLogin()}
      <div className={props.visible == "profile" && loading == false ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500">
            <h1 className="text-2xl font-bold text-white tracking-wide">Citizen Profile</h1>
            <p className="text-slate-300 text-sm mt-1">Your registered personal details</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-lg font-bold text-slate-900">{userData.name || props.uName}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-lg font-bold text-slate-900 truncate">{userData.email || props.mail}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-lg font-bold text-slate-900">{userData.phone || props.contact}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Age</p>
                  <p className="text-lg font-bold text-slate-900">{userData.age || "--"} Years</p>
                </div>
              </div>
              
              <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Registered Address / District</p>
                  <p className="text-lg font-bold text-slate-900 break-words">{userData.district || props.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading == true && <div className="flex justify-center mt-10"><Loading /></div>}
    </>
  );
}//05326456990