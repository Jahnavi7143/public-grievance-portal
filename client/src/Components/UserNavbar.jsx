import React from "react";
import NAVLOGO from "../Images/nav-logo.png";
import { Link } from "react-router-dom";

export default function UserNavbar(props){
  return (
    <nav className="w-full bg-slate-900 border-b border-amber-500 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center gap-3">
            <img src={NAVLOGO} alt="Logo" className="h-10 md:h-12 w-auto" />
            <div className="flex flex-col">
               <h1 className="text-xl md:text-2xl font-bold tracking-wider leading-tight text-white m-0 p-0">आवाज़</h1>
               <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-300 hidden sm:block">Public Grievance Portal</span>
            </div>
          </div>
          
          <Link
            to="/userlogin"
            className="md:hidden px-4 py-2 text-xs font-bold tracking-wider uppercase text-white bg-slate-800 border-border-slate-700 rounded-lg shadow-sm hover:bg-slate-700 active:scale-95 transition-all"
          >
            LOGOUT
          </Link>
        </div>
      </div>
      
      {/* Mobile Navigation Tabs (visible only on small screens) */}
      <div className="md:hidden bg-slate-800 border-t border-slate-700 overflow-x-auto hide-scrollbar">
        <div className="flex w-max min-w-full">
          {props.first && (
            <button 
              className="flex-1 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-700 border-b-2 border-transparent focus:border-amber-500 transition-colors whitespace-nowrap"
              onClick={() => props.handle("1", "profile")}
            >
              {props.first}
            </button>
          )}
          {props.second && (
            <button 
              className="flex-1 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-700 border-b-2 border-transparent focus:border-amber-500 transition-colors whitespace-nowrap"
              onClick={() => props.handle("2", "view")}
            >
              {props.second}
            </button>
          )}
          {props.third && (
            <button 
              className="flex-1 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-700 border-b-2 border-transparent focus:border-amber-500 transition-colors whitespace-nowrap"
              onClick={() => props.handle("3", "new")}
            >
              {props.third}
            </button>
          )}
          {props.fourth && (
            <button 
              className="flex-1 px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-slate-300 hover:text-white hover:bg-slate-700 border-b-2 border-transparent focus:border-amber-500 transition-colors whitespace-nowrap"
              onClick={() => props.handle("4", "update")}
            >
              {props.fourth}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}