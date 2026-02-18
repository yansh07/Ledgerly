import UserNav from "../components/UserNav"
import DashboardHero from "../components/DashboardHero"

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <UserNav />
      <DashboardHero />
    </div>
  )
}

export default Dashboard