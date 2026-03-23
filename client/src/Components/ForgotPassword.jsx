import React from 'react'
import axios from "axios";
import Navbar from './Navbar';
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
export default function ForgotPassword() {
      const [loading, setLoading] = React.useState(false);
      const [email,setEmail]=React.useState({
          email:""
      })
      function handleChange(e) {
        setEmail((prev)=>{
          return{
            ...prev,
            [e.target.name]:e.target.value
          }
        });
      }
      const Navigate = useNavigate();
      function handleSubmit(){
        if(email.email===""){
            alert("Please enter email");
        }
        else{
          setLoading(true);
          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/api/v1/auth/forgot-password",
            headers: {
              "Content-Type": "application/json",
            },
            data: email,
          };
          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              setLoading(false);
              alert("Check your email for reset link");
              Navigate("/ResetPassword")
            })
            .catch((error) => {
              console.log(error);
              alert(error.response.data.msg)
              setLoading(false);
              Navigate("/")
            });
        }
      }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 text-center">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Forgot Password</h2>
            <p className="text-slate-300 text-sm mt-2">Enter your email to request a reset link</p>
          </div>
          
          <div className="px-8 py-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="name@example.com"
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                onChange={handleChange}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors active:scale-95"
            >
              {loading && <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>}
              Send Reset Link
            </button>
            
            <div className="text-center mt-4 text-sm">
                <NavLink to="/userlogin" className="font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  &larr; Back to login
                </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
