import React from "react";
import NAVLOGO from "../Images/nav-logo.png";
export default function footer(props) {
  return (
    <>
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
        <div className="mx-auto w-full max-w-7xl p-8 py-12 lg:py-16">
          <div className="md:flex md:justify-between items-start">
            <div className="mb-8 md:mb-0 max-w-xs transition-opacity hover:opacity-90">
              <a href="#" className="flex items-center mb-4">
                <img src={NAVLOGO} className="h-10 mr-3 brightness-0 invert" alt="Logo" />
                <span className="self-center text-3xl font-bold whitespace-nowrap text-white">
                  आवाज़
                </span>
              </a>
              <p className="text-sm text-slate-400 leading-relaxed">
                Centralized Public Grievance Redress And Monitoring System. An initiative by the Government of India.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-12 sm:grid-cols-3">
              <div>
                <h2 className="mb-4 text-sm font-bold text-white uppercase tracking-wider">
                  Important Links
                </h2>
                <ul className="text-slate-400 font-medium space-y-3">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">National Portal of India</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Digital India</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-bold text-white uppercase tracking-wider">
                  Connect With Us
                </h2>
                <ul className="text-slate-400 font-medium space-y-3">
                  <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg> Facebook</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors flex items-center gap-2"><svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg> Twitter (X)</a></li>
                </ul>
              </div>
              <div>
                <h2 className="mb-4 text-sm font-bold text-white uppercase tracking-wider">
                  Legal
                </h2>
                <ul className="text-slate-400 font-medium space-y-3">
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-amber-500 transition-colors">Disclaimer</a></li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-8 border-slate-800 sm:mx-auto" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-slate-500 sm:text-center">
              © {new Date().getFullYear()} <a href="#" className="hover:text-white transition-colors font-medium">Awaaz Portal</a>. All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
