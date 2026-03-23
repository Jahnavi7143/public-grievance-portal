import React, { Fragment } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Loading from "./Loading";
export default function MyGrievance(props) {
  const navigate = useNavigate();
  const [officerDetails, setOfficerDetails] = React.useState([]);
  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/manage/getOfficerData",
    headers: {
      Authorization: `Bearer ${token}`
    },
  };
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const sortedData = [...response.data.data].sort(function (a, b) {
          return a.department > b.department ? 1 : b.department > a.department ? -1 : 0;
        });
        setOfficerDetails(sortedData);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401) {
          alert("Unauthorized. Please log in as an Admin.");
          localStorage.removeItem("token");
          navigate("/userlogin");
        }
        setLoading(false);
      });
  }, [props.refreshTrigger])
  const officerData = officerDetails.map((officer, index) => (
    <Fragment key={index}>
      <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
        <td className="px-5 py-4 whitespace-nowrap text-sm font-medium text-slate-500 border-b-0 border-r-0 border-l-0 border-t-0">{officer._id.slice(-6).toUpperCase()}</td>
        <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-slate-800 border-b-0 border-r-0 border-l-0 border-t-0">{officer.name}</td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-slate-600 border-b-0 border-r-0 border-l-0 border-t-0">{officer.email}</td>
        <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-slate-700 border-b-0 border-r-0 border-l-0 border-t-0 uppercase tracking-wider">{officer.department}</td>
        <td className="px-5 py-4 whitespace-nowrap text-sm border-b-0 border-r-0 border-l-0 border-t-0">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
            {officer.level == 1 ? "Level 1" : officer.level == 2 ? "Level 2" : "Level 3"}
          </span>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-center border-b-0 border-r-0 border-l-0 border-t-0">
          {officer.avgRating == null ? (
            <span className="text-slate-400 italic text-xs">Unrated</span>
          ) : (
            <span className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">
              {officer.avgRating} <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            </span>
          )}
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-center border-b-0 border-r-0 border-l-0 border-t-0">
          <span className="font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{officer.pendingCount}</span>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-center border-b-0 border-r-0 border-l-0 border-t-0">
          <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">{officer.inProcessCount}</span>
        </td>
        <td className="px-5 py-4 whitespace-nowrap text-sm text-center border-b-0 border-r-0 border-l-0 border-t-0">
          <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">{officer.resolvedCount}</span>
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
      <div className={props.visible == "view" ? "p-4 md:p-8 w-full max-w-7xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[calc(100vh-8rem)]">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 flex justify-between items-center shrink-0">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Officer Registry</h1>
              <p className="text-slate-300 text-sm mt-1">Directory of government officials and performance metrics</p>
            </div>
            {loading && <Loading />}
          </div>

          <div className="overflow-x-auto overflow-y-auto hide-scrollbar flex-1 p-6 bg-slate-50">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-slate-100 z-10 shadow-sm">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b border-slate-200">ID</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b border-slate-200">Name</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b border-slate-200">Email</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b border-slate-200">Department</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap border-b border-slate-200">Level</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b border-slate-200">Rating</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b border-slate-200">Pending</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b border-slate-200">In Process</th>
                    <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap text-center border-b border-slate-200">Resolved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {officerDetails.length > 0 ? officerData : (
                    <tr>
                      <td colSpan="9" className="px-5 py-8 text-center text-slate-500 font-medium">No officers found in the registry.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
