import UserNav from "../components/UserNav"
import DashboardHero from "../components/DashboardHero"
import MoneyOptions from "../components/MoneyOptions"

function Dashboard() {
  return (
    <div className="max-w-4xl mx-auto w-full">
      <UserNav />
      <DashboardHero />
      <MoneyOptions />
    </div>
  )
}

export default Dashboard