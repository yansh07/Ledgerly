import { getUserData } from "../utils/auth";
import { useState } from "react";

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};

function DashboardHero() {
  const [userName] = useState<string | null>(() => {
    const userData = getUserData();
    return userData?.name ?? null;
  });

  return (
    <div className=" px-6 md:px-10 pt-4">
      <div>
        <div className="md:text-5xl text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500">
          <span>{getGreeting()}, </span>
          <span>{userName}</span>
        </div>
      </div>
      <p className="text-gray-300 pt-4 font-light">Here's a quick look at your finances.</p>
    </div>
  );
}

export default DashboardHero;
