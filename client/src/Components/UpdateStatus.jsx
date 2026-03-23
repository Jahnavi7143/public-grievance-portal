import React from "react";
import axios from "axios";
import Loading from "./Loading";
export default function UpdateStatus(props) {
  const token=localStorage.getItem("token")
  const [id, setId] = React.useState("");
  function handleIDChange(e) {
    setId(e.target.value);
  }
  const [data, setData] = React.useState({
    status: "pending",
    feedback:"" 
  });
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
 let config = {
   method: "get",
   maxBodyLength: Infinity,
   url: `http://localhost:3000/api/v1/tasks/${id}`,
   headers: {
     Authorization:
       `Bearer ${token}`,
   },
 };
 let config2 = {
   method: "patch",
   maxBodyLength: Infinity,
   url: `http://localhost:3000/api/v1/tasks/feedback/${id}`,
   headers: {
     Authorization:
       `Bearer ${token}`,
     "Content-Type": "application/json",
   },
   data: data,
 };
 const [loading, setLoading] = React.useState(false);
 function onSubmit(e){
  e.preventDefault()
  if(data.status=="" && data.feedback==""){
    alert("Please fill all the fields");
    return;
  }
  else{
    setLoading(true);
    axios
      .request(config2)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);
        alert("Status Updated");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured:"+error.response.data.message);
      }); 
  }
 }
 const [complaint, setComplaint] = React.useState({
  subject:"",
  description:"",
  department:"",
  status:"",
  createdAt:""
 })
  function onSubmitId(e){
    e.preventDefault();
    if(id==""){
      alert("Please enter the grievance ID");
    }
    else{
      setLoading(true);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setComplaint(response.data.complaint)
          setLoading(false)
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  console.log(data.status)
  function checkLogin() {
    if (!token) {
      navigate("/userAdminLogin");
    }
  }
  return (
    <>
      {checkLogin()}
      <div className={props.visible == "new" ? "p-4 md:p-8 w-full max-w-5xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Lookup Grievance</h1>
              <p className="text-slate-300 text-sm mt-1">Enter ID to view or update status</p>
            </div>
            <form className="flex w-full md:w-auto gap-2" onSubmit={onSubmitId}>
              <input
                type="text"
                id="id"
                placeholder="Grievance ID"
                className="w-full md:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                name="id"
                onChange={handleIDChange}
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg shadow-sm focus:outline-none transition-colors disabled:opacity-70 whitespace-nowrap"
              >
                Find
              </button>
            </form>
          </div>
          {loading && <div className="p-4 flex justify-center"><Loading /></div>}
        </div>

        {complaint.createdAt && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-8 py-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider">Grievance Information</h2>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Subject</h3>
                  <p className="text-lg font-bold text-slate-900">{complaint.subject}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Filing Date</h3>
                  <p className="text-lg font-bold text-slate-900">{complaint.createdAt.slice(0, 10)}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</h3>
                  <p className="text-base text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-100">{complaint.description}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</h3>
                  <p className="text-lg font-bold text-slate-900">{complaint.department}</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Current Status</h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider ${
                    complaint.status === "resolved" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
                    complaint.status === "pending" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                    "bg-blue-100 text-blue-800 border border-blue-200"
                  }`}>
                    {complaint.status}
                  </span>
                </div>
              </div>

              {complaint.status !== "resolved" && (
                <form onSubmit={onSubmit} className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
                  <h3 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b border-slate-200 pb-2">Update Action</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <label htmlFor="status" className="block text-sm font-semibold text-slate-700 mb-2">New Status</label>
                      <select
                        name="status"
                        id="status"
                        className="block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        value={data.status}
                        onChange={handleChange}
                      >
                        <option value="pending">Pending</option>
                        <option value="in process">In Process</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="feedback" className="block text-sm font-semibold text-slate-700 mb-2">Feedback / Remarks</label>
                      <input
                        type="text"
                        name="feedback"
                        id="feedback"
                        placeholder="Enter your official remarks..."
                        className="block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wider uppercase text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? "Updating..." : "Submit Update"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
