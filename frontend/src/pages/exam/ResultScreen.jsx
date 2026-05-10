import { motion } from "framer-motion";

function ResultScreen({
  finalScore,
  percentage,
  quizLength,
  existingResult,
  setExamFinished,
  setExistingResult,
  setCurrentQuestion,
  setSelectedOption,
  setAnswers,
  setScore,
  setShowInstructions,
  setExamStarted,
  setTimeLeft,
  setQuiz,
  navigate,
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          w-full
          max-w-3xl
          bg-white/80
          backdrop-blur-xl
          rounded-[35px]
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          py-8
          px-10
          text-center
          border border-white/30
        "
      >

        {/* TOP ICON */}
        <div className="text-7xl mb-4">
          🎉
        </div>

        {/* TITLE */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {existingResult
            ? "Previous Exam Result"
            : "Exam Completed"}
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-500 mt-4 text-lg">
          {existingResult
            ? "This is your previously submitted exam result."
            : "Great work! Your exam has been submitted successfully."}
        </p>

        {/* SCORE CARDS */}
        <div className="mt-10 grid md:grid-cols-3 gap-5">

          {/* SCORE */}
          <div className="bg-white text-gray-500 rounded-3xl p-6 shadow-xl">
            <h2 className="text-lg font-medium opacity-90">
              Score
            </h2>

            <div className="text-5xl text-black font-bold mt-3">
              {finalScore}
            </div>

            <p className="mt-2 opacity-80">
              Correct Answers
            </p>
          </div>

          {/* TOTAL QUESTIONS */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-medium text-gray-500">
              Total Questions
            </h2>

            <div className="text-5xl font-bold text-gray-800 mt-3">
              {quizLength}
            </div>

            <p className="mt-2 text-gray-400">
              Attempted
            </p>
          </div>

          {/* PERCENTAGE */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h2 className="text-lg font-medium text-gray-500">
              Percentage
            </h2>

            <div className="text-5xl font-bold text-green-500 mt-3">
              {percentage}%
            </div>

            <p className="mt-2 text-gray-400">
              Overall Performance
            </p>
          </div>
        </div>

        {/* PERFORMANCE MESSAGE */}
        <div className="mt-8">

          {percentage >= 80 ? (
            <div className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl inline-block font-medium">
              Excellent Performance 🚀
            </div>
          ) : percentage >= 50 ? (
            <div className="bg-yellow-100 text-yellow-700 px-5 py-3 rounded-2xl inline-block font-medium">
              Good Job 👍
            </div>
          ) : (
            <div className="bg-red-100 text-red-700 px-5 py-3 rounded-2xl inline-block font-medium">
              Keep Practicing 💪
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">

          {/* RETRY BUTTON */}
          <button
            onClick={() => {
              setExamFinished(false);

              setExistingResult(null);

              setCurrentQuestion(0);

              setSelectedOption(null);

              setAnswers([]);

              setScore(0);

              setShowInstructions(true);

              setExamStarted(false);

              setTimeLeft(600);

              setQuiz((prev) =>
                [...prev].sort(() => Math.random() - 0.5)
              );
            }}
            className="
              px-6 py-3
              rounded-2xl
              bg-white
              border border-gray-200
              shadow-md
              hover:bg-gray-100
              transition
              font-medium
            "
          >
            Retry Exam
          </button>

          {/* DASHBOARD BUTTON */}
          <button
            onClick={() => navigate("/dashboard")}
            className="
              px-8 py-3
              rounded-2xl
              bg-black
              text-white
              shadow-lg
              hover:scale-105
              transition
              font-semibold
            "
          >
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ResultScreen;