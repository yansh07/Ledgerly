const profile = {
  name: "Priyanshu",
  email: "priyanshu@gmail.com",
  memberSince: "Jun 2024",
  lastLogin: "Feb 18, 2026",
  plan: "Starter",
  status: "Active",
  location: "Delhi, IN",
  avatarUrl: "https://lh3.googleusercontent.com/a/default-user=s96-c",
};

function Profile() {
  return (
    <div className="max-w-4xl mx-auto w-full px-6 md:px-10 py-10">
      <div className="rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 p-6 md:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatarUrl}
              alt="Profile avatar"
              className="h-16 w-16 rounded-full border border-gray-700 object-cover"
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{profile.name}</h1>
              <p className="text-gray-400 text-sm">{profile.email}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-400">Member since</p>
            <p className="text-white font-semibold">{profile.memberSince}</p>
          </div>
        </div>

        <p className="mt-5 text-gray-300">
          Building budgets, not excuses. Powered by Google sign-in and a little optimism.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Full Name</p>
            <input
              readOnly
              value={profile.name}
              className="mt-2 w-full bg-transparent text-white font-medium focus:outline-none"
              aria-label="Full name"
            />
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Email</p>
            <input
              readOnly
              value={profile.email}
              className="mt-2 w-full bg-transparent text-white font-medium focus:outline-none"
              aria-label="Email"
            />
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Location</p>
            <input
              readOnly
              value={profile.location}
              className="mt-2 w-full bg-transparent text-white font-medium focus:outline-none"
              aria-label="Location"
            />
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Last Login</p>
            <input
              readOnly
              value={profile.lastLogin}
              className="mt-2 w-full bg-transparent text-white font-medium focus:outline-none"
              aria-label="Last login"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Plan</p>
            <p className="mt-2 text-white font-semibold">{profile.plan}</p>
            <p className="text-xs text-gray-500">Upgrade anytime in billing.</p>
          </div>
          <div className="rounded-xl border border-gray-800 bg-gray-950/60 p-4">
            <p className="text-xs text-gray-500">Account Status</p>
            <p className="mt-2 text-emerald-300 font-semibold">{profile.status}</p>
            <p className="text-xs text-gray-500">All systems operational.</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
          <button
            type="button"
            className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:border-gray-500 cursor-pointer"
          >
            Logout
          </button>
          <button
            type="button"
            className="rounded-lg border border-red-500/60 px-4 py-2 text-sm text-red-200 hover:border-red-400 cursor-pointer"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;