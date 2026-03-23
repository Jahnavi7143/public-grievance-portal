import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";   
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "./Loading";
function Login(props){
  const [loginData, setLoginData] = React.useState({email:"", password:""});
  const [user,setUser]=React.useState("Citizen");
  function handleChange(e){
    setLoginData({...loginData, [e.target.name]:e.target.value});
  }
  function handleRadio(e){
    setUser(e.target.value);
  }
  const navigate=useNavigate();
 let config = {
   method: "post",
   maxBodyLength: Infinity,
   url: (user=="Citizen"?("http://localhost:3000/api/v1/auth/login"):(user=="Officer"?("http://localhost:3000/api/v1/auth/officer/login"):("http://localhost:3000/api/v1/auth/admin/login"))) ,
   headers: {
     Authorization: "Bearer ",
     "Content-Type": "application/json",
   },
   data:loginData,
 };
  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    if(loginData.email=="" || loginData.password==""){
      setLoading(false)
      alert("Please fill all the fields");
    }
    else{ 
      try {
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          localStorage.setItem("token", response.data.token);
          setLoading(false);
          {user=="Citizen"?navigate("/userpage"):(user=="Officer"?navigate("/adminpage"):navigate("/MainAdminPage"))}
      })
        .catch((error) => {
          if(error.response.status==401){
            setLoading(false)
            alert("Invalid Credentials");
          }
        });

    } catch (error) {
      console.log(error);
    }
    }
  }
  const [loading,setLoading]=React.useState(false);
  function forgotPassword(){
    navigate("/ForgotPassword");
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-slate-100/50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 text-center">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Portal Access</h2>
            <p className="text-slate-300 text-sm mt-2">Sign in to your account</p>
          </div>
          
          <div className="px-8 py-8">
            <div className="space-y-6">
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

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-xs font-semibold text-amber-600 hover:text-amber-500 transition-colors"
                    onClick={forgotPassword}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={handleChange}
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

              <div className="pt-2">
                <p className="text-sm font-semibold text-slate-700 mb-3">Login Role</p>
                <div className="grid grid-cols-3 gap-3">
                  <label className={`cursor-pointer border rounded-lg py-2 px-3 flex items-center justify-center transition-colors ${user === 'Citizen' ? 'bg-amber-50 border-amber-500 text-amber-700 ring-1 ring-amber-500' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input type="radio" value="Citizen" name="role" className="sr-only" onChange={handleRadio} checked={user==='Citizen'} />
                    <span className="text-sm font-medium">Citizen</span>
                  </label>
                  <label className={`cursor-pointer border rounded-lg py-2 px-3 flex items-center justify-center transition-colors ${user === 'Officer' ? 'bg-amber-50 border-amber-500 text-amber-700 ring-1 ring-amber-500' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input type="radio" value="Officer" name="role" className="sr-only" onChange={handleRadio} checked={user==='Officer'} />
                    <span className="text-sm font-medium">Officer</span>
                  </label>
                  <label className={`cursor-pointer border rounded-lg py-2 px-3 flex items-center justify-center transition-colors ${user === 'Admin' ? 'bg-amber-50 border-amber-500 text-amber-700 ring-1 ring-amber-500' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
                    <input type="radio" value="Admin" name="role" className="sr-only" onChange={handleRadio} checked={user==='Admin'} />
                    <span className="text-sm font-medium">Admin</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors active:scale-95"
                >
                  {loading && <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></div>}
                  Secure Sign In
                </button>
              </div>
            </div>

            <div className="mt-8 text-center border-t border-slate-100 pt-6">
              <p className="text-sm text-slate-600">
                Don't have an account yet?{" "}
                <NavLink to="/" className="font-bold text-slate-900 hover:text-amber-600 transition-colors">
                  Sign up
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
