import { SiTypescript, SiPostgresql, SiFastapi, SiJsonwebtokens } from "react-icons/si";
import { MdMailOutline } from "react-icons/md";

const technologies = [
  {
    icon: SiTypescript,
    name: "TypeScript",
    role: "Frontend",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: SiFastapi,
    name: "FastAPI",
    role: "Backend",
    color: "from-green-400 to-emerald-600",
  },
  {
    icon: SiPostgresql,
    name: "PostgreSQL",
    role: "Database",
    color: "from-cyan-400 to-blue-600",
  },
  {
    icon: SiJsonwebtokens,
    name: "JWT Auth",
    role: "Security",
    color: "from-amber-400 to-orange-600",
  },
  {
    icon: MdMailOutline,
    name: "Email Tasks",
    role: "Background Jobs",
    color: "from-pink-400 to-rose-600",
  },
];

function Tech() {
  return (
    <div className="py-20 px-6 md:px-12 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-100 mb-4">
            Engineered with Excellence
          </h2>
          <p className="text-gray-400 text-lg">
            Built on proven, battle-tested technologies
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="group relative bg-slate-800 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 flex flex-col items-center justify-center text-center"
            >
              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${tech.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all mb-4`}
              >
                <div
                  className={`bg-gradient-to-br ${tech.color} p-0.5 rounded-lg`}
                >
                  <tech.icon className="text-4xl md:text-5xl text-white" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-black text-gray-100 mb-2">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-400 font-medium">{tech.role}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl border border-gray-700 bg-gradient-to-r from-amber-500/5 to-orange-500/5">
          <p className="text-center text-gray-300 text-lg">
            <span className="font-black text-amber-400">Modern stack.</span>{" "}
            Scalable architecture. Built to grow with your money (and your
            sanity).
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tech;
