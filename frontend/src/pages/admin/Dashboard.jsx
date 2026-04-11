import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";

function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);

  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">

      {/* Back Button */}
      <FaArrowLeftLong 
        className="w-6 h-6 cursor-pointer mb-6 text-gray-700 hover:text-black transition"
        onClick={() => navigate("/")}
      />

      <div className="max-w-7xl mx-auto space-y-10">

        {/* HERO SECTION */}
        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6 border">
          
          <div className="flex items-center gap-5">
            <img
              src={userData?.photoUrl || img}
              alt="Educator"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
            />

            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                👋 Welcome back, {userData?.name || "Educator"}
              </h1>
              <p className="text-gray-500 text-sm mt-1 max-w-md">
                {userData?.description || "Manage your courses and track performance"}
              </p>

              <p className="mt-2 text-lg font-medium text-gray-800">
                Total Earnings: <span className="text-indigo-600 font-semibold">₹{totalEarnings.toLocaleString()}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            + Create Course
          </button>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Courses</p>
            <h2 className="text-2xl font-semibold mt-2">
              {creatorCourseData?.length || 0}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Total Students</p>
            <h2 className="text-2xl font-semibold mt-2">
              {creatorCourseData?.reduce((sum, c) => sum + (c.enrolledStudents?.length || 0), 0)}
            </h2>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-sm text-gray-500">Revenue</p>
            <h2 className="text-2xl font-semibold mt-2 text-indigo-600">
              ₹{totalEarnings.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Lectures Chart */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Course Progress
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={courseProgressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lectures" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrollment Chart */}
          <div className="bg-white rounded-3xl shadow-sm p-6 border">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Student Enrollment
            </h2>

            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={enrollData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard