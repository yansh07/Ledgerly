import { GrAdd } from "react-icons/gr";
import { LiaCloudDownloadAltSolid } from "react-icons/lia";

function Options() {
  return (
    <div className="text-gray-200 flex justify-end gap-10 pt-4">
        <div className="px-3 flex gap-6">
            <div className="flex items-center gap-3 border px-2 py-1 rounded-lg border-gray-800 bg-slate-900 hover:shadow-[0_1px_0] cursor-pointer hover:shadow-amber-500 transition-all duration-400">
            <span className="text-md font-normal">Download Your Report</span>
            <span><LiaCloudDownloadAltSolid className="text-xl"/></span>
        </div>
        <div className="flex items-center gap-3 border px-2 py-1 rounded-lg border-gray-800 bg-slate-900 hover:shadow-[0_1px_0] cursor-pointer hover:shadow-amber-500 transition-all duration-400">
            <span className="text-md font-normal">Add a spend</span>
            <span><GrAdd className="text-lg"/></span>
        </div>
        </div>
    </div>
  )
}

export default Options