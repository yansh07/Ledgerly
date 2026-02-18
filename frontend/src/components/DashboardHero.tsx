const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning ☀️";
  } else if (hour >= 12 && hour < 17) {
    return "Good Afternoon 🌤️";
  } else if (hour >= 17 && hour < 21) {
    return "Good Evening 🌆";
  } else {
    return "Good Night 🌙";
  }
};


function DashboardHero() {
  return (
    <div className=" px-3">
      <div>
        <span className="text-white md:text-4xl text-3xl font-medium">{getGreeting()}, </span>
        <span className="text-white md:text-4xl text-3xl font-medium">Priyanshu</span>
      </div>
    </div>
  );
}

export default DashboardHero;
