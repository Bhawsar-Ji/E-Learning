import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import DashboardSidebar from "./DashboardSidebar";
import CreditsSection from "../creditComponents/CreditsSection";
import ContinueLearningCard from "./ContinueLearningCard";
import EnrolledCourseCard from "./EnrolledCourseCard";
const ExploreCoursesCard = React.lazy(() => import("./ExploreCoursesCard"));
import TransactionCard from "../creditComponents/TransactionCard";
import { useNavigate } from "react-router-dom";

import {
  FaBookOpen,
  FaRobot,
  FaBars,
  FaWallet,
  FaTrophy,
  FaChartLine,
} from "react-icons/fa";

function DashboardPage() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  const fetchDashboard = async () => {
  try {
    const cachedData = sessionStorage.getItem("dashboardData");

    if (cachedData) {
      setDashboardData(JSON.parse(cachedData));
      setLoading(false);
    }

    const response = await axios.get(`${serverUrl}/api/users/dashboard`, {
      withCredentials: true,
    });

    setDashboardData(response.data);
    sessionStorage.setItem("dashboardData", JSON.stringify(response.data));
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to load dashboard");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchDashboard();
}, []);

  const enrolledCourses = dashboardData?.enrolledCourses || [];
  const continueLearning = dashboardData?.continueLearning || {};
  const credits = dashboardData?.credits || 0;
  const transactions = dashboardData?.transactions || [];

const aiCourses = React.useMemo(() => {
  return enrolledCourses.filter((course) => course.isAiCourse);
}, [enrolledCourses]);

const normalCourses = React.useMemo(() => {
  return enrolledCourses.filter((course) => !course.isAiCourse);
}, [enrolledCourses]);

const spentCredits = React.useMemo(() => {
  return transactions
    .filter((item) => item.type === "spent")
    .reduce((total, item) => total + (item.amount || 0), 0);
}, [transactions]);

  if (loading) {
  return (
    <div className="min-h-screen bg-[#f7f8fc] p-6">
      <div className="flex gap-6">
        
        {/* Sidebar Skeleton */}
        <div className="hidden lg:block w-[260px]">
          <div className="h-screen rounded-[32px] bg-slate-200 animate-pulse" />
        </div>

        <div className="flex-1 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="h-5 w-32 rounded bg-slate-200 animate-pulse" />
              <div className="h-10 w-72 rounded bg-slate-200 animate-pulse" />
              <div className="h-4 w-96 rounded bg-slate-200 animate-pulse" />
            </div>

            <div className="h-12 w-40 rounded-2xl bg-slate-200 animate-pulse" />
          </div>

          {/* Stats Cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] bg-white p-5 shadow-sm"
              >
                <div className="h-12 w-12 rounded-2xl bg-slate-200 animate-pulse" />

                <div className="mt-5 h-4 w-24 rounded bg-slate-200 animate-pulse" />

                <div className="mt-3 h-8 w-16 rounded bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Continue Learning */}
          <div className="rounded-[34px] bg-white p-6 shadow-sm">
            <div className="h-7 w-52 rounded bg-slate-200 animate-pulse mb-6" />

            <div className="flex gap-5">
              <div className="h-40 w-64 rounded-3xl bg-slate-200 animate-pulse" />

              <div className="flex-1 space-y-4">
                <div className="h-5 w-52 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-72 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-5 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-[28px] bg-white p-5 shadow-sm"
              >
                <div className="h-40 rounded-2xl bg-slate-200 animate-pulse" />

                <div className="mt-5 h-5 w-52 rounded bg-slate-200 animate-pulse" />

                <div className="mt-3 h-4 w-32 rounded bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfcff] via-[#f7f8ff] to-[#f5f3ff] text-gray-900">
      <div className="flex">
        <>
          {/* MOBILE SIDEBAR */}
          {showSidebar && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setShowSidebar(false)}
              />

              <div className="relative z-50">
                <DashboardSidebar
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  navigate={navigate}
                  userData={userData}
                  setShowSidebar={setShowSidebar}
                />
              </div>
            </div>
          )}

          {/* DESKTOP SIDEBAR */}
          <div className="hidden lg:block">
            <DashboardSidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              navigate={navigate}
              userData={userData}
            />
          </div>
        </>

        <main className="w-full lg:ml-[260px]">
          <div className="mx-auto max-w-7xl px-5 py-8">
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <button
                onClick={() => setShowSidebar(true)}
                className="rounded-2xl bg-black p-3 text-white"
              >
                <FaBars />
              </button>

              
            </div>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-black">
                  Student Dashboard
                </p>
                <h1 className="mt-2 text-4xl font-bold">
                  Welcome back{userData?.name ? `, ${userData.name}` : ""} 👋
                </h1>
                <p className="mt-3 text-gray-500">
                  Manage your courses, AI credits and learning progress.
                </p>
              </div>
              <div className="flex flex-row item-center justify-between gap-2">
                <button
                  onClick={() => navigate("/generate-ai")}
                  className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-600"
                >
                  + Generate New
                </button>
                {userData?.role === "educator" && (
                  <button
                    onClick={() => navigate("/educator-dashboard")}
                    className="rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-indigo-600"
                  >
                    Educator Dashboard
                  </button>
                )}
              </div>
            </div>

            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <CreditsSection
                  credits={credits}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                  refreshUser={fetchDashboard}
                  
                />

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <StatCard
                    icon={<FaBookOpen />}
                    label="Enrolled"
                    value={normalCourses.length}
                  />
                  <StatCard
                    icon={<FaRobot />}
                    label="AI Courses"
                    value={aiCourses.length}
                  />
                  <StatCard
                    icon={<FaWallet />}
                    label="Credits Spent"
                    value={spentCredits}
                  />
                  <StatCard
                    icon={<FaChartLine />}
                    label="Total Courses"
                    value={enrolledCourses.length}
                  />
                </div>

                <section className="rounded-[34px] bg-white/75 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.05)]">
                  <h2 className="mb-5 text-2xl font-bold">Continue Learning</h2>
                  <ContinueLearningCard continueLearning={continueLearning} />
                </section>

                <React.Suspense fallback={null}>
  <ExploreCoursesCard />
</React.Suspense>
              </div>
            )}

            {activeTab === "courses" && (
              <CourseSection title="My Courses" courses={normalCourses} />
            )}

            {activeTab === "ai" && (
              <CourseSection
                title="AI Generated Courses"
                courses={aiCourses}
                emptyText="No AI courses generated yet."
              />
            )}

            {activeTab === "credits" && (
              <CreditsSection
                credits={credits}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                refreshUser={fetchDashboard}
              />
            )}

            {activeTab === "transactions" && (
              <TransactionCard transactions={transactions} />
            )}

            {activeTab === "certificates" && (
              <ComingSoon title="Certificates" />
            )}

            {activeTab === "settings" && <ComingSoon title="Settings" />}
          </div>
        </main>
      </div>
    </div>
  );
}

function CourseSection({ title, courses, emptyText = "No courses yet." }) {
  return (
    <div className="space-y-6">
      <section className="rounded-[34px] bg-white/75 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.05)]">
        <h2 className="mb-6 text-2xl font-bold">{title}</h2>

        {courses.length === 0 ? (
          <div className="rounded-[28px] bg-gray-50 p-12 text-center">
            <p className="text-xl font-semibold">{emptyText}</p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {courses.map((course) => (
              <EnrolledCourseCard key={course.courseId} course={course} />
            ))}
          </div>
        )}
      </section>

      <React.Suspense fallback={null}>
  <ExploreCoursesCard />
</React.Suspense>
    </div>
  );
}


function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-[28px] bg-white/75 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
      <div className="mb-4 inline-flex rounded-2xl bg-indigo-50 p-3 text-indigo-600">
        {icon}
      </div>

      <p className="text-sm text-gray-500">{label}</p>

      <h3 className="mt-2 text-3xl font-bold">{value}</h3>
    </div>
  );
}

function ComingSoon({ title }) {
  return (
    <div className="rounded-[34px] bg-white/75 p-12 text-center shadow-[0_15px_45px_rgba(15,23,42,0.05)]">
      <FaTrophy className="mx-auto text-5xl text-indigo-500" />

      <h2 className="mt-5 text-2xl font-bold">{title}</h2>

      <p className="mt-2 text-gray-500">This section will be added soon.</p>
    </div>
  );
}

export default DashboardPage;
