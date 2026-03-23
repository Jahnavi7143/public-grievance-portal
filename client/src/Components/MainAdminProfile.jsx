import React from 'react'
import pfp from "../Images/pfp.png";
import axios from "axios";
import Loading from "./Loading";
export default function MainAdminProfile(props) {
    const [adminData,setAdminData]=React.useState({})
    const token = localStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/v1/manage/",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          `Bearer ${token}`,
      },
    };
    React.useState(() => {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setAdminData(response.data.admin)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        }); 
    }, []);
    const [loading, setLoading] = React.useState(true);
    function checkLogin() {
        if (!token) {
            navigate("/userAdminLogin");
        }
    }
  return (
    <>
      {checkLogin()}
      <div className={props.visible == "profile" && loading == false ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500">
            <h1 className="text-2xl font-bold text-white tracking-wide">Administrator Profile</h1>
            <p className="text-slate-300 text-sm mt-1">Your registered administrative details</p>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Admin Name</p>
                  <p className="text-lg font-bold text-slate-900">{adminData.name}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Official Email</p>
                  <p className="text-lg font-bold text-slate-900 truncate">{adminData.email}</p>
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Role Assigned</p>
                  <p className="text-lg font-bold text-slate-900 capitalize">{adminData.role}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Jurisdiction / District</p>
                  <p className="text-lg font-bold text-slate-900 break-words">{adminData.district}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      {loading == true && <div className="flex justify-center mt-10"><Loading /></div>}
    </>
  );
}
