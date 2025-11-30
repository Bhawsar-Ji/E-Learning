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

const Nav = () => {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/10 border-b border-white/10 shadow-md">
      <div className="flex items-center justify-between h-[70px] px-6 lg:px-16">
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          className="w-[130px] cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/")}
        />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6">
          {userData?.role === "educator" && (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium hover:opacity-90 transition"
            >
              Dashboard
            </button>
          )}

          {!userData && (
            <button
              onClick={() => navigate("/login")}
              className="px-5 py-2 rounded-xl bg-white/20 text-white border border-white/30 hover:bg-white/30 transition"
            >
              Login
            </button>
          )}

          {userData && (
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-xl bg-white text-black font-medium shadow hover:bg-gray-200 transition"
            >
              Log Out
            </button>
          )}

          {/* Profile Avatar */}
          <div
            className="relative"
            onClick={() => setShowPro((prev) => !prev)}
          >
            {userData ? (
              userData.photoUrl ? (
                <img
                  src={userData.photoUrl}
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover border-2 border-white cursor-pointer hover:scale-105 transition"
                />
              ) : (
                <div className="w-11 h-11 flex items-center justify-center rounded-full bg-black text-white border-2 border-white text-lg cursor-pointer hover:scale-105 transition">
                  {userData?.name?.slice(0, 1).toUpperCase()}
                </div>
              )
            ) : (
              <IoMdPerson className="w-11 h-11 p-2 bg-black/70 text-white rounded-full border border-white cursor-pointer hover:scale-105 transition" />
            )}

            {/* Profile Dropdown */}
            <AnimatePresence>
              {showPro && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-3 bg-white text-black rounded-2xl shadow-lg border border-gray-200 py-2 w-[180px]"
                >
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-5 py-2 text-left hover:bg-gray-100 rounded-lg"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate("/enrolledcourses")}
                    className="w-full px-5 py-2 text-left hover:bg-gray-100 rounded-lg"
                  >
                    My Courses
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger Icon */}
        <GiHamburgerMenu
          className="w-7 h-7 text-white lg:hidden cursor-pointer"
          onClick={() => setShowHam(true)}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showHam && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-lg flex flex-col items-center justify-center gap-6 z-40"
          >
            <GiSplitCross
              className="absolute top-5 right-5 w-8 h-8 text-white cursor-pointer"
              onClick={() => setShowHam(false)}
            />

            {userData ? (
              <>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-[70%] text-center py-3 bg-white/20 text-white rounded-xl border border-white/20 hover:bg-white/30"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate("/enrolledcourses")}
                  className="w-[70%] text-center py-3 bg-white/20 text-white rounded-xl border border-white/20 hover:bg-white/30"
                >
                  My Courses
                </button>
                {userData?.role === "educator" && (
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="w-[70%] text-center py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:opacity-90"
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="w-[70%] text-center py-3 bg-white text-black rounded-xl shadow hover:bg-gray-200"
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="w-[70%] text-center py-3 bg-white text-black rounded-xl shadow hover:bg-gray-200"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
