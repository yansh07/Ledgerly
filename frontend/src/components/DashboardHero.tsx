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
  return (
    <div className=" px-6 md:px-10 pt-4">
      <div className="md:text-4xl text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-300 to-gray-500">
        <span>{getGreeting()}, </span>
        <span>Priyanshu</span>
      </div>
    </div>
  );
}

export default DashboardHero;
