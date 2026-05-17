import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Developers from "./pages/Developers";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/ForgotPassword";
import getCurrentUser from "./customHooks/getCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EducatorDashboard from "./pages/admin/Dashboard";
import StudentDashboard from "./pages/Dashboard";
import Courses from "./pages/admin/Courses";
import AllCouses from "./pages/AllCouses";
import AddCourses from "./pages/admin/AddCourses";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateLecture from "./pages/admin/CreateLecture";
import EditLecture from "./pages/admin/EditLecture";

import getCouseData from "./customHooks/getCouseData";
import ViewCourse from "./pages/ViewCourse";
import ScrollToTop from "./components/ScrollToTop";
import getCreatorCourseData from "./customHooks/getCreatorCourseData";
import EnrolledCourse from "./pages/EnrolledCourse";
import ViewLecture from "./pages/ViewLecture";
import SearchWithAi from "./pages/SearchWithAi";
import getAllReviews from "./customHooks/getAllReviews";
import GenCourse from "./pages/GenCourse";
import ResultPage from "./pages/ResultPage";
import ExamPage from "./pages/ExamPage";

export const serverUrl =
  import.meta.env.VITE_SERVER_URL || "https://e-learning-m3z7.onrender.com";

function App() {
  const { userData, loading } = useSelector((state) => state.user);

  getCurrentUser();
  getCouseData();
  getCreatorCourseData();
  getAllReviews();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc] px-4">
  <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-[0_15px_45px_rgba(15,23,42,0.06)]">
    
    <div className="flex justify-center">
      <div className="h-14 w-14 rounded-full border-4 border-slate-200 border-t-black animate-spin" />
    </div>

    <h2 className="mt-6 text-center text-2xl font-bold text-gray-800">
      Loading your experience...
    </h2>

    <div className="mt-8 space-y-4 animate-pulse">
      <div className="h-4 w-full rounded-full bg-slate-200" />
      <div className="h-4 w-5/6 rounded-full bg-slate-200" />
      <div className="h-4 w-2/3 rounded-full bg-slate-200" />
    </div>
    
  </div>
</div>
    );
  }

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/developers" element={<Developers />} />
        <Route path="/examboard" element={<ExamPage />} />

        <Route
          path="/generate-ai"
          element={userData ? <GenCourse /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/result"
          element={userData ? <ResultPage /> : <Navigate to={"/generate-ai"} />}
        />

        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/allcourses"
          element={userData ? <AllCouses /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/viewcourse/:courseId"
          element={userData ? <ViewCourse /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/editprofile"
          element={userData ? <EditProfile /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/enrolledcourses"
          element={userData ? <EnrolledCourse /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/viewlecture/:courseId"
          element={userData ? <ViewLecture /> : <Navigate to={"/signup"} />}
        />
        <Route
          path="/searchwithai"
          element={userData ? <SearchWithAi /> : <Navigate to={"/signup"} />}
        />

        <Route
          path="/dashboard"
          element={userData ? <StudentDashboard /> : <Navigate to="/signup" />}
        />

        <Route
          path="/educator-dashboard"
          element={
            userData?.role === "educator" ? (
              <EducatorDashboard />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/courses"
          element={
            userData?.role === "educator" ? (
              <Courses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/addcourses/:courseId"
          element={
            userData?.role === "educator" ? (
              <AddCourses />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createcourses"
          element={
            userData?.role === "educator" ? (
              <CreateCourse />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/createlecture/:courseId"
          element={
            userData?.role === "educator" ? (
              <CreateLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route
          path="/editlecture/:courseId/:lectureId"
          element={
            userData?.role === "educator" ? (
              <EditLecture />
            ) : (
              <Navigate to={"/signup"} />
            )
          }
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </>
  );
}

export default App;
