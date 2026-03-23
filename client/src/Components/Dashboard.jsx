import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import pfp from "../Images/pfp.png";

export default function Dashboard(props){
  const navigate=useNavigate()
  function handleLogout(){
    localStorage.removeItem("token")
    navigate("/userlogin")
  }
  const getButtonClass = (isActive) => {
    return `w-full text-left px-6 py-4 text-sm font-semibold tracking-wider uppercase transition-all duration-200 border-l-4 ${
      isActive 
        ? "bg-slate-800 border-amber-500 text-amber-500" 
        : "border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200 hover:border-slate-600"
    }`;
  };

  return (
    <aside className="hidden md:flex flex-col w-72 bg-slate-900 border-r border-slate-800 h-full min-h-[calc(100vh-5rem)] shadow-lg z-10 shrink-0">
      <div className="p-8 pb-6 flex flex-col items-center border-b border-slate-800">
        <div className="h-24 w-24 rounded-full bg-slate-800 p-1 border-2 border-slate-700 shadow-inner mb-4 relative overflow-hidden group">
          <img src={pfp} alt="Profile" className="h-full w-full rounded-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <span className="text-xs uppercase tracking-widest text-amber-500 font-bold">Portal Access</span>
      </div>
      
      <div className="flex-1 py-4 flex flex-col overflow-y-auto hide-scrollbar">
        {props.first && (
          <button className={getButtonClass(props.clicked === "1")} onClick={() => props.handle("1", "profile")}>
            {props.first}
          </button>
        )}
        {props.second && (
          <button className={getButtonClass(props.clicked === "2")} onClick={() => props.handle("2", "view")}>
            {props.second}
          </button>
        )}
        {props.third && (
          <button className={getButtonClass(props.clicked === "3")} onClick={() => props.handle("3", "new")}>
            {props.third}
          </button>
        )}
        {props.fourth && (
          <button className={getButtonClass(props.clicked === "4")} onClick={() => props.handle("4", "update")}>
            {props.fourth}
          </button>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900/50">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-900/20 hover:bg-red-900/40 text-red-400 hover:text-red-300 text-sm font-bold tracking-wider uppercase rounded-lg transition-colors border border-transparent hover:border-red-900/50"
        >
          <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          Logout Session
        </button>
      </div>
    </aside>
  );
}