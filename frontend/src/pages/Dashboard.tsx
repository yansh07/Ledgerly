import UserNav from "../components/UserNav"
import Options from "../components/Options"

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <UserNav />
      <Options />
    </div>
  )
}

export default Dashboard