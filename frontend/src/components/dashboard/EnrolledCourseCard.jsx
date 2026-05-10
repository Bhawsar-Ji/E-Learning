import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

function EnrolledCourseCard({ course }) {
  const navigate = useNavigate();

  const handleNavigate = () => {

    if (course.isAiCourse) {

      navigate("/result", {
        state: {
          ...course.content,
          aiCourseId: course.courseId,
        },
      });

    } else {

      navigate(`/viewcourse/${course.courseId}`);

    }
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 md:grid-cols-[120px_1fr]">
        <div className="h-40 md:h-full overflow-hidden rounded-3xl">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover object-[5%_center]"
          />
        </div>

        <div className="flex flex-col justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {course.title}
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Instructor: {course.instructor}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Progress</span>

              <span className="font-semibold text-gray-900">
                {course.progress}%
              </span>
            </div>

            <ProgressBar percent={course.progress} />

            <button
              onClick={handleNavigate}
              className="w-full rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Go to Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourseCard;