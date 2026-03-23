import React from "react";
import axios from "axios";
import Modal from "./Modal";
import Loading from "./Loading";
export default function GrievanceStatus(props) {
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/tasks",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [id,setId]=React.useState("")
  const [complaints, setComplaints] = React.useState([]);
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setComplaints(response.data.tasks);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured");
      });
  }, []);
  const [isVisible, setIsVisible] = React.useState(false);
  const [actionHistory, setActionHistory] = React.useState();
  function handleAction(complaint) {
    setActionHistory(complaint.actionHistory);
    setIsVisible((prev) => !prev);
  }
  function handleForward(complaint){
    setId(complaint._id)
    handleLevelForward(complaint._id)
  }
  function handleLevelForward(id){
    let level = JSON.stringify({});
    setLoading(true)
    let config2 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/tasks/pass/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: level,
    };
    axios
      .request(config2)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false)
        alert("Forwarded to next level Officer");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured:"+error.response.data.message);
      });  
    }
    const [loading, setLoading] = React.useState(false); 
    complaints.sort(function (a, b) {
      return a.status > b.status ? 1 : b.status > a.status ? -1 : 0;
    });
   const complaintData = complaints.map((complaint, index) => (
     <Fragment key={index}>
       <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
         <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-800 border-b-0 border-r-0 border-l-0 border-t-0">{complaint._id.slice(-6)}</td>
         <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 border-b-0 border-r-0 border-l-0 border-t-0">
           <div className="font-semibold text-slate-900">{complaint.createdAt.slice(0, 10)}</div>
           <div className="text-xs text-slate-500">{complaint.createdAt.slice(11, 16)}</div>
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-800 border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.department}
         </td>
         <td className="px-5 py-4 text-sm text-slate-700 min-w-[200px] border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.subject}
         </td>
         <td className="px-5 py-4 text-sm text-slate-600 min-w-[250px] border-b-0 border-r-0 border-l-0 border-t-0 leading-relaxed">
           <div className="line-clamp-2" title={complaint.description}>{complaint.description}</div>
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.contact}
         </td>
         <td className="px-5 py-4 whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">
           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
             complaint.status === "resolved" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
             complaint.status === "pending" ? "bg-amber-100 text-amber-800 border border-amber-200" :
             "bg-blue-100 text-blue-800 border border-blue-200"
           }`}>
             {complaint.status}
           </span>
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.updatedAt ? (
             <>
               <div className="font-semibold text-slate-900">{complaint.updatedAt.slice(0, 10)}</div>
               <div className="text-xs text-slate-500">{complaint.updatedAt.slice(11, 16)}</div>
             </>
           ) : (
             <span className="text-slate-400 italic">Not updated</span>
           )}
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm text-center border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.actionHistory[complaint.actionHistory.length - 1]?.officerLevel != "3" && complaint.status != "resolved" ? (
             <button
               className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors uppercase tracking-wider"
               onClick={() => handleForward(complaint)}
               disabled={loading}
             >
               Forward
             </button>
           ) : (
             <span className="text-slate-400 text-xs">-</span>
           )}
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm border-b-0 border-r-0 border-l-0 border-t-0">
           <button
             className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wider text-xs bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded transition-colors border border-amber-200"
             onClick={() => handleAction(complaint)}
           >
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             History
           </button>
         </td>
         <td className="px-5 py-4 whitespace-nowrap text-sm font-medium border-b-0 border-r-0 border-l-0 border-t-0">
           {complaint.status == "resolved" ? (
             complaint.rating == null ? (
               <span className="text-slate-500 italic text-xs">Unrated</span>
             ) : (
               <span className="inline-flex items-center gap-1 text-amber-500 font-bold">
                 {complaint.rating} <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
               </span>
             )
           ) : (
             <span className="text-slate-400 text-xs">-</span>
           )}
         </td>
       </tr>
     </Fragment>
   ));

   function checkLogin() {
     if (!token) {
       navigate("/userAdminLogin");
     }
   }
   
  return (
    <>
      {checkLogin()}
      {loading && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-sm"><Loading /></div>}
      <Modal visible={isVisible} setVisible={setIsVisible} data={actionHistory} />
      
      <div className={props.visible == "view" ? "p-4 md:p-8 w-full max-w-[95%] mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Grievance Status</h1>
              <p className="text-slate-300 text-sm mt-1">Monitor and manage public grievance reports</p>
            </div>
          </div>
          
          <div className="w-full overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">ID</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Filing Time</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Department</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Subject</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Description</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Contact</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Status</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b-0 border-r-0 border-l-0 border-t-0">Updated</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b-0 border-r-0 border-l-0 border-t-0">Forward</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b-0 border-r-0 border-l-0 border-t-0">History</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b-0 border-r-0 border-l-0 border-t-0">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {complaints.length > 0 ? complaintData : (
                  <tr>
                    <td colSpan="11" className="px-5 py-8 text-center text-slate-500 font-medium border-b-0 border-r-0 border-l-0 border-t-0">No grievances assigned to you found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
