import React from "react";
import NAVLOGO from "../Images/nav-logo.png"
import { NavLink } from "react-router-dom";
export default function Navbar(props){   
    return (
      <>
        <nav className="w-full bg-slate-900 border-b border-amber-500 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-4">
                <img src={NAVLOGO} alt="Logo" className="h-12 w-auto" />
                <div className="flex flex-col">
                   <h1 className="text-2xl font-bold tracking-wider leading-tight text-white m-0 p-0">आवाज़</h1>
                   <span className="text-[10px] uppercase tracking-widest text-slate-300">Public Grievance Portal</span>
                </div>
              </div>
              <div className="flex items-center space-x-8">
                <NavLink to="/" className={({ isActive }) => `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${isActive ? 'text-amber-500' : 'text-slate-300 hover:text-white'}`}>
                  HOME
                </NavLink>
                <NavLink to="/userlogin" className={({ isActive }) => `text-sm font-semibold uppercase tracking-wider transition-colors duration-200 px-5 py-2 rounded-md border ${isActive ? 'bg-amber-600 border-amber-600 text-white shadow-sm' : 'border-slate-500 text-slate-200 hover:border-amber-500 hover:text-amber-400'}`}>
                  LOGIN
                </NavLink>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
}