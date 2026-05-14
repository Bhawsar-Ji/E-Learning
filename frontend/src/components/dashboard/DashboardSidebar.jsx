import React from "react";
import {
  FaBookOpen,
  FaRobot,
  FaWallet,
  FaHistory,
  FaCertificate,
  FaArrowLeft,
  FaHome,
} from "react-icons/fa";

function DashboardSidebar({
  activeTab,
  setActiveTab,
  navigate,
  userData,
  setShowSidebar,
}) {
  return (
    <aside className="flex fixed left-0 top-0 h-screen w-[260px] flex-col px-6 py-7 bg-white/95 backdrop-blur-xl border-r border-white/40">
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-indigo-100 p-3 text-black text-xl">
          <FaBookOpen />
        </div>

        <div>
          <h2 className="text-xl font-bold">Course Crush</h2>
          <p className="text-xs text-gray-500">AI Powered E-Learning</p>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="mt-10 space-y-2">
        {[
          ["dashboard", "Dashboard", FaHome],
          ["courses", "My Courses", FaBookOpen],
          ["ai", "AI Courses", FaRobot],
          ["credits", "Credits", FaWallet],
          ["transactions", "Transactions", FaHistory],
          ["certificates", "Certificates", FaCertificate],
          ["landing", "Landing Page", FaArrowLeft],
        ].map(([key, label, Icon]) => (
          <button
            key={key}
            onClick={() => {
              if (key === "landing") {
                navigate("/");
              } else {
                setActiveTab(key);
              }
              if (setShowSidebar) {
                setShowSidebar(false);
              }
            }}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all ${
              activeTab === key
                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                : "text-gray-500 hover:bg-white hover:text-gray-900"
            }`}
          >
            <Icon />
            {label}
          </button>
        ))}
      </nav>

      {/* PROFILE */}
      <div className="mt-auto rounded-[30px] bg-white/70 p-4 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div className="flex items-center gap-3">
          <img
            src={
              userData?.photoUrl ||
              "https://ui-avatars.com/api/?name=User&background=6366f1&color=fff"
            }
            alt="profile"
            className="h-14 w-14 rounded-2xl object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-gray-900">
              {userData?.name || "User"}
            </h3>

            <p className="truncate text-xs text-gray-500">{userData?.email}</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/editprofile")}
          className="mt-4 w-full rounded-2xl bg-black py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
