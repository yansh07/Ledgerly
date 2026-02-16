import { IoMdAnalytics } from "react-icons/io";
import { HiBellAlert } from "react-icons/hi2";
import { GrSecure } from "react-icons/gr";
import { FaFileExport } from "react-icons/fa6";
import { RiShieldCheckFill } from "react-icons/ri";

const features = [
    {
        icon: IoMdAnalytics,
        title: "Analytics That Sting",
        desc: "Watch your money disappear in real-time with beautiful charts. See exactly where that 3am panic-buy went. Data doesn't lie, but it does judge.",
    },
    {
        icon: HiBellAlert,
        title: "Broke-As Alerts",
        desc: "Get notified before you become a cautionary tale. Smart spending limits that whisper 'maybe not' before you hit the buy button on something stupid.",
    },
    {
        icon: GrSecure,
        title: "Fort Knox Energy",
        desc: "JWT tokens and OAuth vault your data like it's the nuclear codes. Your financial secrets are safer here than in your diary. Probably.",
    },
    {
        icon: FaFileExport,
        title: "The Export Escape",
        desc: "CSV, PDF—whatever format your accountant demands. Proof you're technically responsible, even if your spending says otherwise.",
    },
    {
        icon: RiShieldCheckFill,
        title: "Privacy First",
        desc: "No ads. No trackers. No selling your data to pizza companies. Your financial chaos is your own beautiful secret.",
    },
]

function Features() {
  return (
    <div className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-4">Features That Get It</h2>
                <p className="text-gray-400 text-lg">Because your money deserves better than a spreadsheet and spite</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((item) => (
                    <div key={item.title} className="group relative bg-gradient-to-br from-slate-900 to-slate-800 border border-gray-700 p-8 rounded-2xl hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-orange-500/0 group-hover:from-amber-500/5 group-hover:to-orange-500/5 rounded-2xl transition-all duration-300" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-all">
                                    <item.icon className="text-3xl text-amber-400" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-gray-100">{item.title}</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed text-base md:text-lg">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Features
