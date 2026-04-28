import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function GenCourse() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return alert("Enter topic");

    try {
      setLoading(true);

      // 🔥 API CALL
      const res = await axios.post(`${serverUrl}/api/ai/generate-ai`, {
        topic,
        language,
        level,
      },{
  withCredentials: true
});

      const result = res.data;
      console.log(result);

      // 👉 result page me bhej
      navigate("/result", { state: result });

    } catch (err) {
      console.log(err)
      alert("API Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-4 min-h-screen gap-10 bg-gradient-to-br from-gray-100 to-gray-200 px-6 py-8">

      {/* HEADER */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto flex flex-col text-center items-center justify-between w-[90%] max-w-[90%] px-5 py-1 bg-white/20 backdrop-blur-xl border border-black/20 rounded-4xl shadow-xl"
      >
        <h1 className="text-3xl font-bold text-purple-500">
          Generate Course with AI
        </h1>

        <p className="text-sm text-black">
          Generate courses with AI instantly
        </p>
      </motion.header>

      {/* FORM CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl mx-auto rounded-2xl bg-white/60 backdrop-blur-lg border border-white/30 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15)] space-y-5 mt-5"
      >

        {/* Topic */}
        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter Topic (e.g. React)"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Language */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
        >
          <option>English</option>
          <option>Hindi</option>
        </select>

        {/* Level */}
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white"
        >
          <option>Beginner</option>
          <option>Advanced</option>
        </select>

        {/* Button */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-medium transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90"}
          `}
        >
          {loading ? "Generating..." : "Generate Course "}
        </button>
      </motion.div>

      {/* 🔥 SAME LOADING STYLE */}
      {loading && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="text-center text-black font-medium mt-6"
        >
          Generating your customized course …
        </motion.div>
      )}
    </div>
  );
}

export default GenCourse;