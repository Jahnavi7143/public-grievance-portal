import React from 'react'
import axios from "axios";
import Loading from "./Loading";

export default function AddNewOfficer(props) {
  const token = localStorage.getItem("token");
     const [data, setData] = React.useState({
      name: "",level:-1,department:"",email:"",password:""
     });
     function handleChange(e){
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
     }
      const [loading, setLoading] = React.useState(false);
      function checkLogin() {
        if (!token) {
          navigate("/userAdminLogin");
        }
      }
      console.log(data.level)
      function handleSubmit(){
        if(data.name=="" || data.level==-1 || data.department=="" || data.email=="" || data.password==""){
          alert("Please fill all the fields");
        }
        else{
          setLoading(true)
          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:3000/api/v1/manage/registerOfficer",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                `Bearer ${token}`,
            },
            data: data,
          };
          axios
            .request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              setLoading(false)
              alert("Officer Added Successfully")
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error);
              alert("Error Occured:"+error.response.data.message);
            });
        }
      }
  return (
    <div>
      {checkLogin()}
      <div className={props.visible == "new" ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500">
            <h1 className="text-2xl font-bold text-white tracking-wide">Add New Officer</h1>
            <p className="text-slate-300 text-sm mt-1">Register a new official into the grievance handling system</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter officer's name"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="Department">
                    Department
                  </label>
                  <select
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={(e) => handleChange(e)}
                    name="department"
                    value={data.department}
                  >
                    <option value="">-- SELECT DEPARTMENT --</option>
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Transport">Transport</option>
                    <option value="Pension">Pension</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="level">
                    Hierarchy Level
                  </label>
                  <select
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    value={data.level}
                    name="level"
                    onChange={(e) => handleChange(e)}
                  >
                    <option value={-1}>-- SELECT LEVEL --</option>
                    <option value={1}>1 - Gram Panchayat</option>
                    <option value={2}>2 - Tehsildar</option>
                    <option value={3}>3 - Municipal Corp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                    Official Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="officer@example.gov.in"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={(e) => handleChange(e)}
                  />
                </div>

                <div className="md:col-span-2 relative">
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                    Temporary Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Assign a secure starting password"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={(e) => handleChange(e)}
                  />
                  {loading == true && <div className="mt-2"><Loading /></div>}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex justify-end">
                <button
                  disabled={loading}
                  className="flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wider uppercase text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                       Registering...
                    </span>
                  ) : "Register Officer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
