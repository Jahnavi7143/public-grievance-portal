import React from 'react'

export default function Modal(props) {
  if(!props.visible)return null;
  console.log(props.data)
  let i=1
  const data = props.data.map((action, index) => {
    return (
      <tr key={index} className="hover:bg-slate-50 transition-colors">
        <td className="px-4 py-4 text-sm font-medium text-slate-500">{i++}</td>
        <td className="px-4 py-4 text-sm font-bold text-slate-800">{action.officerName}</td>
        <td className="px-4 py-4 text-sm text-slate-600">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            {action.officerLevel == 1 ? "Gram Panchayat" : action.officerLevel == 2 ? "Tehsildar" : "Municipal Corp"}
          </span>
        </td>
        <td className="px-4 py-4 text-sm text-slate-500 whitespace-nowrap">
          {action.time ? action.time.slice(0, 10) : ""} <span className="text-slate-400">at</span> {action.time ? action.time.slice(11, 16) : ""}
        </td>
        <td className="px-4 py-4 text-sm text-slate-700 leading-relaxed max-w-xs break-words whitespace-pre-wrap">
          {action.feedback}
        </td>
      </tr>
    );
  });
  
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-amber-500 bg-slate-900 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white tracking-wide">Action History</h2>
          <button
            className="text-slate-400 hover:text-white transition-colors focus:outline-none"
            onClick={() => props.setVisible(!props.visible)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Modal Body */}
        <div className="p-6 overflow-y-auto hide-scrollbar bg-slate-50 flex-1">
          <div className="overflow-x-auto border border-slate-200 rounded-lg bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 border-t-0 border-x-0">
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap border-b border-b-slate-200">S No.</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap border-b border-b-slate-200">Officer Name</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap border-b border-b-slate-200">Designation</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap border-b border-b-slate-200">Time of Action</th>
                  <th className="px-4 py-3 text-xs font-bold text-slate-600 uppercase tracking-wider min-w-[200px] border-b border-b-slate-200">Feedback</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
