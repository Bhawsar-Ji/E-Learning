function ExamHeader({
  courseTitle,
  currentQuestion,
  quizLength,
  timeLeft,
  minutes,
  seconds,
}) {
  return (
    <div className="max-w-4xl mx-auto mb-6">

      <div className="flex justify-between items-center mb-3">

        <h1 className="text-3xl font-bold text-indigo-600">
          {courseTitle}
        </h1>

        <span className="bg-white px-4 py-2 rounded-xl shadow text-sm font-medium">
           {/* TIMER */}
        <div
          className={`
    ${timeLeft <= 60 ? "bg-red-100 text-red-600" : "bg-white text-black"}
  `}
        >
          Time Left - {minutes}:{seconds.toString().padStart(2, "0")}
        </div>
        </span>
      </div>

      {/* PROGRESS */}
      <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">

        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / quizLength) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

export default ExamHeader;