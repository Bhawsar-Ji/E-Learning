import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { toast } from "react-toastify";

import { FaArrowLeft, FaWallet } from "react-icons/fa6";
import { FaMagic, FaRobot } from "react-icons/fa";

import TransactionCard from "../components/creditComponents/TransactionCard";

function GenCourse() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [creditInfoTab, setCreditInfoTab] = useState("info");

  const creditCostByLevel = {
    Beginner: 5,
    Intermediate: 8,
    Advanced: 10,
  };

const requiredCredits = creditCostByLevel[level] || creditCostByLevel["Beginner"] || 5;

  useEffect(() => {
    const fetchUserCredits = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/users/currentuser`, {
          withCredentials: true,
        });

        setUserCredits(res.data?.credits || 0);
        setTransactions(res.data?.transactions || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserCredits();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return toast.error("Enter topic");

    if (userCredits < requiredCredits) {
      return toast.error("Insufficient credits");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${serverUrl}/api/ai/generate-ai`,
        {
          topic,
          language,
          level,
        },
        {
          withCredentials: true,
        },
      );

      const result = res.data;

      if (result?.remainingCredits !== undefined) {
        setUserCredits(result.remainingCredits);
      }

      toast.success("Course Generated");
      navigate("/result", { state: result });
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fbfcff] via-[#f7f8ff] to-[#f5f3ff] px-5 py-8 text-gray-900">
      <div className="mx-auto max-w-6xl">
        {/* TOP BAR */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
          >
            <FaArrowLeft className="mr-2 inline" />
            Back
          </button>

          <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-sm">
            <div className="rounded-xl bg-yellow-100 p-2 text-yellow-500">
              <FaWallet />
            </div>

            <div>
              <p className="text-xs text-gray-500">Available Credits</p>
              <p className="text-lg font-bold">{userCredits}</p>
            </div>
          </div>
        </div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-[32px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-[1px] shadow-[0_20px_60px_rgba(99,102,241,0.20)]"
        >
          <div className="rounded-[32px] bg-white/95 px-6 py-6 backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              {/* LEFT */}
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
                  AI Course Generator
                </p>

                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  Generate your course with AI
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-500">
                  Enter your topic, choose language and difficulty level, and
                  generate your personalized course today.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[34px] bg-white/80 p-7 shadow-[0_15px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold">Course Details</h2>
              <p className="mt-1 text-sm text-gray-500">
                Fill the details below to generate your customized course.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Course Topic
                </label>

                <input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. React JS, Java Backend, Python Basics"
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none focus:border-black focus:bg-white"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Language
                  </label>

                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none focus:border-black focus:bg-white"
                  >
                    <option>English</option>
                    <option>Hindi</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Level
                  </label>

                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm outline-none focus:border-black focus:bg-white"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || userCredits < requiredCredits}
                className={`w-full rounded-2xl px-6 py-4 text-sm font-semibold text-white transition ${
                  loading || userCredits < requiredCredits
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-black hover:bg-gray-800"
                }`}
              >
                {loading
                  ? "Generating..."
                  : `Generate with ${requiredCredits} Credits`}
              </button>

              {userCredits < requiredCredits && (
                <p className="text-center text-sm font-medium text-red-500">
                  You need {requiredCredits - userCredits} more credits to
                  generate this course.
                </p>
              )}
            </div>
            {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="mt-6 text-center font-medium text-black"
          >
            Generating your customized course …
          </motion.div>
        )}
          </motion.div>

          {/* COURSE INFO */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[34px] bg-white/80 p-6 shadow-[0_15px_45px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-6 flex rounded-2xl bg-gray-100 p-1">
              <button
                onClick={() => setCreditInfoTab("info")}
                className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
                  creditInfoTab === "info"
                    ? "bg-black text-white shadow"
                    : "text-gray-500"
                }`}
              >
                How Credits Work
              </button>

              <button
                onClick={() => setCreditInfoTab("transactions")}
                className={`flex-1 rounded-xl py-3 text-sm font-semibold transition ${
                  creditInfoTab === "transactions"
                    ? "bg-black text-white shadow"
                    : "text-gray-500"
                }`}
              >
                Transactions
              </button>
            </div>

            {creditInfoTab === "info" ? (
              <>
                <h3 className="text-2xl font-bold text-gray-900">
                  How Credits Work?
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  Credits are used according to the difficulty level and course
                  depth.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">Beginner</p>
                      <p className="text-sm font-bold text-green-600">
                        5 Credits
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      4 modules, easy explanations, beginner quizzes and simple
                      examples.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        Intermediate
                      </p>
                      <p className="text-sm font-bold text-indigo-600">
                        8 Credits
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      6 modules, practical concepts, better examples and
                      structured learning.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">Advanced</p>
                      <p className="text-sm font-bold text-purple-600">
                        10 Credits
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      10 modules, advanced concepts, real-world projects and
                      detailed assessments.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900">
                  Credit Transactions
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Your latest credit usage and purchase history.
                </p>

                <div className="mt-6 space-y-3">
                  <TransactionCard transactions={transactions} />
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default GenCourse;
