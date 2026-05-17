import React, { useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { GiHamburgerMenu, GiSplitCross } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import logo from "../assets/logo.png";
import Button from "./Button";

const Nav = () => {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <nav className="fixed top-2 left-0 w-full z-50 flex justify-center">
      <div
        className="flex items-center justify-between w-[90%] max-w-[90%] px-5 py-1
    bg-white/20 backdrop-blur-xl border border-white/30 
    rounded-4xl shadow-lg"
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="h-12 md:h-16 w-auto brightness-80 saturate-200 cursor-pointer scale-120 md:scale-170 hover:scale-140 transition"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {userData && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-1 rounded-full bg-gray-100 text-black text-sm backdrop-blur-3xl hover:bg-gray-300 transition"
            >
              Dashboard
            </button>
          )}

          {!userData && (
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1 rounded-full bg-black text-white text-sm hover:bg-gray-800 transition"
            >
              Login
            </button>
          )}

          {userData && (
            <button
              onClick={handleLogout}
              className="px-4 py-1 rounded-full bg-gray-100 text-black text-sm hover:bg-gray-300 transition"
            >
              Logout
            </button>
          )}

          {/* Profile */}
          <div className="relative" onClick={() => setShowPro((prev) => !prev)}>
            {userData ? (
              userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border border-white cursor-pointer"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )
            ) : (
              <IoMdPerson className="w-10 h-10 p-2 bg-black text-white rounded-full" />
            )}

            {/* Dropdown */}
            <AnimatePresence>
              {showPro && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 w-[180px] 
                bg-white/80 backdrop-blur-lg border border-white/30 
                rounded-2xl shadow-lg p-2"
                >
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/enrolledcourses")}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    My Courses
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Icon */}
        <GiHamburgerMenu
          className="w-6 h-6 md:hidden cursor-pointer"
          onClick={() => setShowHam(true)}
        />
      </div>
{/* Mobile Menu */}
      <AnimatePresence>
        {showHam && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 md:hidden bg-black/50 backdrop-blur-sm z-40"
          >
            <div className="absolute top-[70px] left-0 right-0 mx-auto w-full max-w-md rounded-b-[32px] bg-white p-6 shadow-2xl">
              <GiSplitCross
                className="absolute top-5 right-5 w-8 h-8 text-black cursor-pointer"
                onClick={() => setShowHam(false)}
              />

              {userData ? (
                <div className="flex flex-col gap-4 pt-10">
                  <button
                    onClick={() => {
                      setShowHam(false);
                      navigate("/profile");
                    }}
                    className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-black"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      setShowHam(false);
                      navigate("/enrolledcourses");
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-300 to-purple-400 px-4 py-3 text-sm font-medium text-indigo-800 transition hover:bg-gray-200"
                  >
                    My Courses
                  </button>
                  <button
                    onClick={() => {
                      setShowHam(false);
                      navigate("/dashboard");
                    }}
                    className="w-full rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-600 px-4 py-3 text-sm font-medium text-indigo-950 transition hover:opacity-90"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={async () => {
                      setShowHam(false);
                      await handleLogout();
                    }}
                    className="w-full rounded-2xl bg-white border border-gray-200 px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-50"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowHam(false);
                    navigate("/login");
                  }}
                  className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-medium text-black transition hover:bg-gray-100"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
