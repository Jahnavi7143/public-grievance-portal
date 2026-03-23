import React from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Loading from "./Loading";
export default function ForgotPassword() {
  const [loading, setLoading] = React.useState(false);
  const [password, setPassword] = React.useState({
     password: "",
     token:""
  });
  const [cPassword, setCPassword] = React.useState("")
  function handleChangePassword(e) {
    setPassword((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }
   const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
     const [showPassword, setShowPassword] = React.useState(false);
  function handleChangeCPassword(e) {
   setCPassword(e.target.value) 
  }
  const Navigate = useNavigate();
  function handleSubmit() {
    if(password.password!==cPassword){
        alert("Passwords do not match");
    }
    else if(password.password=="" || password.token=="" || cPassword=="" ){
      alert("Please fill all the fields")
    }
    else{
      setLoading(true)
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/api/v1/auth/reset-password",
            headers: {
                "Content-Type": "application/json",
            },
            data: password,
        };
        axios
            .request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("Password reset successful");
                setLoading(false);
                Navigate("/userlogin");
            })
            .catch((error) => {
                console.log(error);
                alert(error)
        });
    }
  }


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 text-center">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">Reset Password</h2>
            <p className="text-slate-300 text-sm mt-2">Create a new password for your account</p>
          </div>
          
          <div className="px-8 py-8 space-y-5">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                  onChange={handleChangePassword}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="cpassword" className="block text-sm font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm new password"
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                onChange={handleChangeCPassword}
              />
            </div>

            <div>
              <label htmlFor="token" className="block text-sm font-semibold text-slate-700 mb-1">
                Reset Token
              </label>
              <input
                type="text"
                name="token"
                id="token"
                placeholder="Enter token from email"
                className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors tracking-widest text-center"
                onChange={handleChangePassword}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors active:scale-95 mt-6"
            >
              {loading && <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>}
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
