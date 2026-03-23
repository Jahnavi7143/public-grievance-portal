import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Modal from "./Modal";
import Loading from "./Loading";
export default function MyGrievance(props) {
  const token = localStorage.getItem("token");

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/complaints",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [grievances, setGrievances] = React.useState([]);
 grievances.sort(function (a, b) {
   return a.status > b.status ? 1 : b.status > a.status ? -1 : 0;
 });
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setGrievances(response.data.complaints);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [isVisible, setIsVisible] = React.useState(false);
  const [actionHistory, setActionHistory] = React.useState();
  function handleAction(grievance){
    setActionHistory(grievance.actionHistory)
    setIsVisible((prev) => !prev)
  }
  function handleReopen(id){
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/complaints/${id}`,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("Reopened Successfully");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured")
      });
  }
  function handleReminder(id){
    setLoading(true)
    let config2 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/complaints/reminder/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .request(config2)
      .then((response) => {
         setLoading(false);
        alert("Reminder Sent Successfully")
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured")
      });
  }
  const [loading, setLoading] = React.useState(false);
  const [rating,setRating]=React.useState(-1);

  function changeRating(e){
    setRating(e.target.value)
    
  }
console.log(rating);

  function handleRating(id){
    if(rating==-1){
      alert("Rating not given")
    }
    else{
      setLoading(true)
      
      let config3 = {
        method: "patch",
        maxBodyLength: Infinity,
        url: `http://localhost:3000/api/v1/complaints/rateOfficer/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            `Bearer ${token}`,
        },
        data:{"rating":rating},
      };

      axios
        .request(config3)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert("Rating submitted")
          window.location.reload(true)
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error)
        });
    }
  }
  function handleDelete(id){
    setLoading(true)
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/v1/complaints/${id}`,
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data))
        alert("Deleted Successfully")
        setLoading(false)
        window.location.reload(true)
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured")
        setLoading(false)
      });
  }
  const grievanceData = grievances.map((grievance, index) => (
    <Fragment key={index}>
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600">
          <div className="font-semibold text-slate-900">{moment(grievance.createdAt).format("DD MMM YYYY")}</div>
          <div className="text-xs text-slate-500">{moment(grievance.createdAt).format("HH:mm")}</div>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-800">
          {grievance.department}
        </td>
        <td className="px-5 py-4 text-sm text-slate-700 min-w-[200px]">
          {grievance.subject}
        </td>
        <td className="px-5 py-4 whitespace-nowrap">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            grievance.status === "resolved" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" :
            grievance.status === "pending" ? "bg-amber-100 text-amber-800 border border-amber-200" :
            "bg-blue-100 text-blue-800 border border-blue-200"
          }`}>
            {grievance.status}
          </span>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm">
          {grievance.status != "resolved" ? (
            grievance.lastRemindedAt == null || new Date().getDate() - new Date(grievance.lastRemindedAt).getDate() > 1 ? (
              <button
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors uppercase tracking-wider"
                onClick={() => handleReminder(grievance._id)}
                disabled={loading}
              >
                Send Reminder
              </button>
            ) : (
              <span className="text-xs text-slate-500 font-medium">
                Wait {7 - (new Date().getDate() - new Date(grievance.lastRemindedAt).getDate())} days
              </span>
            )
          ) : (
            <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wider">Completed</span>
          )}
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm">
          <button
            className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold uppercase tracking-wider text-xs bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded transition-colors border border-amber-200"
            onClick={() => handleAction(grievance)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            View
          </button>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm">
          {grievance.status == "resolved" && grievance.isRated == false && (
            <button
              className="text-xs font-bold text-red-600 hover:text-white border border-red-600 hover:bg-red-600 px-3 py-1.5 rounded transition-colors uppercase tracking-wider"
              onClick={() => handleReopen(grievance._id)}
            >
              Reopen
            </button>
          )}
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm min-w-[200px]">
          {grievance.status == "resolved" && grievance.isRated == false ? (
            <div className="flex items-center gap-2">
              <select
                name="rating"
                id="rating"
                value={rating}
                className="bg-slate-50 border border-slate-300 text-slate-800 text-xs rounded focus:ring-amber-500 focus:border-amber-500 block p-1.5 w-24"
                onChange={changeRating}
              >
                <option value="">Rate</option>
                <option value={1}>1 ★</option>
                <option value={2}>2 ★★</option>
                <option value={3}>3 ★★★</option>
                <option value={4}>4 ★★★★</option>
                <option value={5}>5 ★★★★★</option>
              </select>
              <button
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-1.5 px-3 text-xs rounded shadow-sm focus:outline-none transition-colors uppercase"
                onClick={() => handleRating(grievance._id)}
                disabled={loading}
              >
                Rate
              </button>
            </div>
          ) : grievance.status == "resolved" ? (
            <span className="text-slate-500 text-xs italic">Rated</span>
          ) : (
            <span className="text-slate-400 text-xs">-</span>
          )}
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-center">
          {grievance.status != "resolved" && (
            <button
              className="text-slate-400 hover:text-red-500 transition-colors p-1"
              onClick={() => handleDelete(grievance._id)}
              title="Delete Grievance"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
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
      <Modal visible={isVisible} setVisible={setIsVisible} data={actionHistory} />
      <div className={props.visible == "view" ? "p-4 md:p-8 w-full max-w-7xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">My Grievances</h1>
              <p className="text-slate-300 text-sm mt-1">Track the status and history of your submitted reports</p>
            </div>
            {loading && <Loading />}
          </div>
          
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Department</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Subject</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Reminder</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">History</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Reopen</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Rating</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {grievances.length > 0 ? grievanceData : (
                  <tr>
                    <td colSpan="9" className="px-5 py-8 text-center text-slate-500 font-medium">No grievances found.</td>
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
