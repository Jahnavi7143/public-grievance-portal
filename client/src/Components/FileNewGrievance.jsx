import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from "axios";
import Loading from './Loading';
function FileNewGrievance(props) {
  const [data, setData] = React.useState({subject:"", description:"", department:""});
  const [submit, setSubmit] = React.useState(false);
  function handleChange(e){
    setData({...data, [e.target.name]: e.target.value});
  }
  const token = localStorage.getItem("token");
 let config = {
   method: "post",
   maxBodyLength: Infinity,
   url: "http://localhost:3000/api/v1/complaints",
   headers: {
     Authorization:
       `Bearer ${token}`,
     "Content-Type": "application/json",
   },
   data: data,
 };
  function handleSubmit(e){
    console.log(data)
    e.preventDefault();
    if(data.subject=="" || data.description=="" || data.department==""){
      alert("Please fill all the fields");
    }
    else{
      setLoading(true)
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setSubmit(true);
          setLoading(false);
          alert("Grievance Filed Successfully");
          if (props.onSuccess) {
            props.onSuccess();
          }
        })
        // .catch((error) => {
        //   console.log(error);
        //   alert("Error Occured:"+error.response.data.message);
        // });
        .catch((error) => {
          console.log(error);

          if (error.response) {
            alert("Error: " + error.response.data.message);
          } else {
            alert("Server not responding");
          }

          setLoading(false);
        });
    }

  }
  const [loading, setLoading] = React.useState(false);
  function checkLogin() {
    if (!token) {
      navigate("/userAdminLogin");
    }
  }
  return (
    <>
      {checkLogin()}
      <div className={props.visible == "new" ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500">
            <h1 className="text-2xl font-bold text-white tracking-wide">File New Grievance</h1>
            <p className="text-slate-300 text-sm mt-1">Submit a detailed report to the concerned department</p>
          </div>
          
          <div className="p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="Dept">
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="Subject">
                    Subject
                  </label>
                  <input
                    id="Subject"
                    name="subject"
                    type="text"
                    placeholder="Brief subject of grievance"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="textarea">
                  Detailed Complaint
                </label>
                <textarea
                  id="textarea"
                  name="description"
                  rows="6"
                  placeholder="Provide all necessary details regarding your grievance..."
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors resize-none mb-3"
                  onChange={(e) => handleChange(e)}
                ></textarea>
                {loading == true && <Loading />}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="text-sm font-medium text-amber-600">
                  {submit ? "✓ Your complaint has been filed successfully." : ""}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wider uppercase text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={(e) => handleSubmit(e)}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                       <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                       Processing...
                    </span>
                  ) : "Submit Grievance"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FileNewGrievance;
