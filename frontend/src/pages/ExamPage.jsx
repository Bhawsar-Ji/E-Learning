import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl} from "../App"

import InstructionModal from "./exam/InstructionModal.jsx";
import ExamHeader from "./exam/ExamHeader.jsx";
import QuestionCard from "./exam/QuestionCard.jsx";
import ResultScreen from "./exam/ResultScreen.jsx";
import LoadingScreen from "./exam/LoadingScreen.jsx";

function ExamPage() {
  const navigate = useNavigate();
  const location = useLocation();

const aiCourseId = location.state?.aiCourseId;
console.log(location.state);
console.log(aiCourseId);
  

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const [examFinished, setExamFinished] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [existingResult, setExistingResult] = useState(null);
  const [resultChecked, setResultChecked] = useState(false);

  const [showInstructions, setShowInstructions] = useState(true);
  const [examStarted, setExamStarted] = useState(false);

  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {

        const res = await axios.get(
          `${serverUrl}/api/course/aicourse/${aiCourseId}`,
          {
    withCredentials: true,
  }
        );

        const shuffledQuiz = [...res.data.quiz].sort(
          () => Math.random() - 0.5
        );

        setQuiz(shuffledQuiz);

        setCourseTitle(res.data.title);

        try {
          const resultRes = await axios.get(
            `${serverUrl}/api/user/exam-result/${aiCourseId}`,
            {
              withCredentials: true,
            }
          );

          if (resultRes.data.success) {
            setExistingResult(resultRes.data.result);

            setExamFinished(true);
          }
        } catch (error) {
          console.log("No previous result");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);

        setResultChecked(true);
      }
    };

    fetchQuiz();
  }, []);

  useEffect(() => {
    if (!examStarted || examFinished) return;

    if (timeLeft <= 0) {
      handleAutoSubmit();

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examStarted, examFinished]);

  if (loading || !resultChecked) {
    return <LoadingScreen />;
  }

  const startExam = () => {
    setShowInstructions(false);

    setExamStarted(true);
  };

  if (showInstructions && !examFinished) {
    return (
      <InstructionModal
        quizLength={quiz.length}
        startExam={startExam}
      />
    );
  }

  const question = quiz[currentQuestion];

  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleAutoSubmit = async () => {
    const percentage = Math.round(
      (score / quiz.length) * 100
    );

    try {
      await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/user/save-result`,
        {
          courseId:aiCourseId,
          score,
          totalQuestions: quiz.length,
          percentage,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }

    setExamFinished(true);

    toast.info("Time is over! Exam submitted.");
  };

  const handleNext = async () => {
    if (!selectedOption) {
      return toast.error("Please select an option");
    }

    const updatedAnswers = [
      ...answers,
      {
        question: question.question,
        selected: selectedOption.text,
      },
    ];

    setAnswers(updatedAnswers);

    if (selectedOption.id === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 === quiz.length) {
      const finalScore =
        selectedOption.id === question.correctAnswer
          ? score + 1
          : score;

      const percentage = Math.round(
        (finalScore / quiz.length) * 100
      );

      try {
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/user/save-result`,
          {
            courseId:aiCourseId,
            score: finalScore,
            totalQuestions: quiz.length,
            percentage,
          },
          {
            withCredentials: true,
          }
        );
      } catch (error) {
        console.log(error);
      }

      setScore(finalScore);

      setExamFinished(true);

      return;
    }

    setCurrentQuestion(currentQuestion + 1);

    setSelectedOption(null);
  };

  if (examFinished) {
    const finalScore = existingResult?.score || score;

    const percentage =
      existingResult?.percentage ||
      Math.round((score / quiz.length) * 100);

    return (
      <ResultScreen
        finalScore={finalScore}
        percentage={percentage}
        quizLength={quiz.length}
        existingResult={existingResult}
        setExamFinished={setExamFinished}
        setExistingResult={setExistingResult}
        setCurrentQuestion={setCurrentQuestion}
        setSelectedOption={setSelectedOption}
        setAnswers={setAnswers}
        setScore={setScore}
        setShowInstructions={setShowInstructions}
        setExamStarted={setExamStarted}
        setTimeLeft={setTimeLeft}
        setQuiz={setQuiz}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-10">

      <ExamHeader
        courseTitle={courseTitle}
        currentQuestion={currentQuestion}
        quizLength={quiz.length}
        timeLeft={timeLeft}
        minutes={minutes}
        seconds={seconds}
      />

      <QuestionCard
        question={question}
        selectedOption={selectedOption}
        handleOptionSelect={handleOptionSelect}
        currentQuestion={currentQuestion}
        quizLength={quiz.length}
        handleNext={handleNext}
        setCurrentQuestion={setCurrentQuestion}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
}

export default ExamPage;