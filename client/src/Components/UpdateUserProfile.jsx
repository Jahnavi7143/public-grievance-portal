import React from "react";
import axios from "axios";
import Loading from "./Loading";
export default function UpdateUserProfile(props) {

  const [data, setData] = React.useState({
    name: "",
    age: "",
    phone: "",
    district: "",
  });
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const token = localStorage.getItem("token");
  let config = {
    method: "patch",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/api/v1/user",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    data: data,
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (data.name == "" || data.age == "" || data.phone == "" || data.district == "") {
      alert("Please fill all the fields");
      return;
    } else {
      setLoading(true);
      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setLoading(false);
          alert("Profile Updated Successfully");
          window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
          alert("Error Occured:" + error.response.data.message);
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
      <div className={props.visible == "update" ? "p-4 md:p-8 w-full max-w-4xl mx-auto" : "hidden"}>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-6 border-b border-amber-500">
            <h1 className="text-2xl font-bold text-white tracking-wide">Update Profile</h1>
            <p className="text-slate-300 text-sm mt-1">Modify your registered personal details</p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="age">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    placeholder="Enter your age"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="phone">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="district">
                    District
                  </label>
                  <input
                    type="text"
                    name="district"
                    id="district"
                    placeholder="Enter your district"
                    className="block w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-colors"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center px-8 py-3 text-sm font-bold tracking-wider uppercase text-white bg-slate-900 border border-transparent rounded-lg shadow-sm hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                      Updating...
                    </span>
                  ) : "Update Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}