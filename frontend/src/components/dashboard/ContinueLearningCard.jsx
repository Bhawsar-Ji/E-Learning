import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function ContinueLearningCard({ continueLearning }) {
  const navigate = useNavigate();
  const hasContent = continueLearning && continueLearning.courseId;

  if (!hasContent) {
    return (
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-lg font-semibold text-gray-900">
          Nothing to continue yet
        </p>
        <p className="mt-2 text-gray-600">
          Enroll in a course and return to this page to resume learning from
          where you left off.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-[320px_1fr]">
      <div className="h-56 overflow-hidden rounded-3xl">
        <img
          src={continueLearning.courseThumbnail}
          alt={continueLearning.courseTitle}
          className="w-full h-full object-cover object-[25%_center]"
        />
      </div>
      <div className="flex flex-col justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">
            Continue
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {continueLearning.courseTitle}
          </h3>
          <p className="mt-3 text-gray-600">
            Next lesson:{" "}
            <span className="font-medium text-gray-900">
              {continueLearning.lessonTitle}
            </span>
          </p>
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span className="font-semibold text-gray-900">
                {continueLearning.progress || 0}%
              </span>
            </div>

            <ProgressBar percent={continueLearning.progress || 0} />
          </div>
        </div>
        <button
          onClick={() => {
            if (continueLearning?.isAiCourse) {
              navigate("/result", {
                state: {
                  ...continueLearning.content,
                  aiCourseId: continueLearning.courseId,
                },
              });
            } else {
              navigate(`/viewlecture/${continueLearning.courseId}`);
            }
          }}
          className="inline-flex items-center justify-center rounded-2xl bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Resume Learning
        </button>
      </div>
    </div>
  );
}

export default ContinueLearningCard;
