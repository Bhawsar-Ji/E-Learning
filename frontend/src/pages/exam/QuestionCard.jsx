import { motion } from "framer-motion";

function QuestionCard({
  question,
  selectedOption,
  handleOptionSelect,
  currentQuestion,
  quizLength,
  handleNext,
  setCurrentQuestion,
  setSelectedOption,
  timeLeft,
  minutes,
  seconds,
}) {
  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="
        max-w-4xl
        mx-auto
        bg-white
        rounded-3xl
        shadow-2xl
        p-8
      "
    >
      {/* QUESTION */}
      <h2 className="text-2xl font-semibold text-gray-800 leading-relaxed">
        {question.question}
      </h2>

      {/* OPTIONS */}
      <div className="mt-8 space-y-4">
        {question.options.map((opt, index) => {
          const isSelected = selectedOption?.id === opt.id;

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(opt)}
              className={`
                w-full
                text-left
                p-3
                rounded-2xl
                border-2
                transition-all
                duration-200
                font-medium
                ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"
                }
              `}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
                >
                  {String.fromCharCode(65 + index)}
                </div>

                <span className="text-gray-700">{opt.text}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* BUTTONS */}
      <div className="flex items-center justify-between mt-10">
        {/* PREVIOUS */}
        <button
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1);
              setSelectedOption(null);
            }
          }}
          disabled={currentQuestion === 0}
          className={`
            flex items-center gap-2
            px-6 py-3 rounded-full
            font-medium transition-all duration-200
            shadow-md
            ${
              currentQuestion === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }
          `}
        >
          ← Previous
        </button>
        
        <span className="bg-white px-4 py-2  text-sm font-medium">
          Q {currentQuestion + 1} / {quizLength}
        </span>

        {/* NEXT / FINISH */}
        <button
          onClick={handleNext}
          className="
            flex items-center gap-2
            px-8 py-3
            bg-black
            text-white
            rounded-full
            font-semibold
            shadow-lg
            hover:scale-105
            transition-all duration-200
          "
        >
          {currentQuestion + 1 === quizLength ? "Finish 🚀" : "Next →"}
        </button>
      </div>
    </motion.div>
  );
}

export default QuestionCard;
