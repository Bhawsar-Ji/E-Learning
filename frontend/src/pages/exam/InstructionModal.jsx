import { motion } from "framer-motion";

function InstructionModal({ quizLength, startExam }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
  initial={{ opacity: 0, scale: 0.9, y: 20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
>
  <div className="bg-black px-6 py-8 text-white">
    <h1 className="text-3xl font-bold">
      Exam Instructions
    </h1>

    <p className="mt-2 text-white/90 text-sm">
      Please read all instructions carefully before starting the exam.
    </p>
  </div>

  <div className="p-6 space-y-4">

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        ✅ Total Questions:{" "}
        <span className="text-indigo-600 font-bold">
          {quizLength}
        </span>
      </p>
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        ⏳ Duration:{" "}
        <span className="text-purple-600 font-bold">
          10 Minutes
        </span>
      </p>
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        ✅ Each question carries 1 mark
      </p>
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        ❌ No negative marking
      </p>
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        ⚠️ Timer will start immediately after clicking Start Exam
      </p>
    </div>

    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
      <p className="text-gray-700 font-medium">
        🚀 Exam will auto submit when timer ends
      </p>
    </div>

    <button
      onClick={startExam}
      className="
        w-full
        mt-4
        py-4
        rounded-2xl
        bg-black
        text-white
        font-semibold
        text-lg
        shadow-lg
        hover:opacity-90
        transition
      "
    >
      Start Exam 
    </button>
  </div>
</motion.div>
    </div>
  );
}

export default InstructionModal;