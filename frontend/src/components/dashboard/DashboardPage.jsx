import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { serverUrl } from '../../App'
import { toast } from 'react-toastify'
import ContinueLearningCard from './ContinueLearningCard'
import EnrolledCourseCard from './EnrolledCourseCard'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function DashboardPage() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const [dashboardData, setDashboardData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/users/dashboard`, {
          withCredentials: true
        })
        setDashboardData(response.data)
      } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const enrolledCourses = dashboardData?.enrolledCourses || []
  const continueLearning = dashboardData?.continueLearning || {}

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="mx-auto max-w-7xl space-y-8">

        {/* 🚀 HERO + BACK BUTTON */}
        <div className="rounded-3xl bg-white p-8 shadow-sm border flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT */}
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
              Student Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-semibold text-gray-900">
              Welcome back{userData?.name ? `, ${userData.name}` : ''}!
            </h1>

            <p className="mt-2 text-gray-600 max-w-2xl">
              See everything you are learning in one place. Resume courses, track progress, and keep moving forward.
            </p>
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white border shadow-sm hover:bg-gray-100 transition"
          >
            <FaArrowLeftLong className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>

        </div>

        {/* ⏳ LOADING */}
        {loading ? (
          <div className="space-y-6">
            <div className="h-56 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="grid gap-4 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-64 rounded-3xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          </div>
        ) : (
          <>

            {/* 📘 CONTINUE LEARNING */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Continue Learning
              </h2>

              <div className="bg-white p-6 rounded-3xl shadow-sm border">
                <ContinueLearningCard continueLearning={continueLearning} />
              </div>
            </div>

            {/* 📚 ENROLLED COURSES */}
            <div className="space-y-4">

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Enrolled Courses
                  </h2>
                  <p className="text-sm text-gray-500">
                    Track your course progress and jump back in.
                  </p>
                </div>

                <div className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
                  {enrolledCourses.length} course{enrolledCourses.length === 1 ? '' : 's'} enrolled
                </div>
              </div>

              {enrolledCourses.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center">
                  <p className="text-xl font-semibold text-gray-900">
                    No enrollments yet
                  </p>
                  <p className="mt-3 text-gray-600">
                    You haven&apos;t enrolled in any courses. Explore the catalog to start learning.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 lg:grid-cols-2">
                  {enrolledCourses.map((course) => (
                    <EnrolledCourseCard key={course.courseId} course={course} />
                  ))}
                </div>
              )}

            </div>

          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage