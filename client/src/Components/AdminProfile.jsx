import React from "react";
import pfp from "../Images/pfp.png";
import axios from "axios";
import Loading from "./Loading";
export default function AdminProfile(props) {

  const token = localStorage.getItem("token");
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/officer",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const [loading, setLoading] = React.useState(true);
  const [officerData, setOfficerData] = React.useState({});
  const [officerRatingData, setOfficerRatingData] = React.useState({});

  React.useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setOfficerData(response.data.officer);
        setOfficerRatingData(response.data.officerRating);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Occured");
      });
  }, []);
  function checkLogin() {
    if (!token) {
      navigate("/userAdminLogin");
    }
  }
  return (
    <>
      {checkLogin()}
      <div className={props.visible == "profile" && loading == false ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide">Officer Profile</h1>
              <p className="text-slate-300 text-sm mt-1">Your registered official details</p>
            </div>
            {officerRatingData.avgRating && (
              <div className="bg-amber-500 text-slate-900 px-4 py-2 rounded-lg font-bold shadow-sm flex items-center gap-2">
                <svg className="w-5 h-5 text-slate-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                {officerRatingData.avgRating} Rating
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Officer Name</p>
                  <p className="text-lg font-bold text-slate-900">{officerData.name}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2-2v10a2 2 0 002 2z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Official Email</p>
                  <p className="text-lg font-bold text-slate-900 truncate">{officerData.email}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Department</p>
                  <p className="text-lg font-bold text-slate-900">{officerData.department}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Designation Level</p>
                  <p className="text-lg font-bold text-slate-900">
                    {officerData.level == 1 ? "Gram Panchayat" : officerData.level == 2 ? "Tehsildar" : "Municipal Corp"}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 bg-slate-50 p-6 rounded-xl border border-slate-100 flex items-center shadow-sm">
                <div className="h-12 w-12 rounded-full bg-slate-900 text-amber-500 flex items-center justify-center font-bold text-xl mr-4 shadow-sm shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Assigned District</p>
                  <p className="text-lg font-bold text-slate-900 break-words">{officerData.district}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading == true && <div className="flex justify-center mt-10"><Loading /></div>}
    </>
  );
}