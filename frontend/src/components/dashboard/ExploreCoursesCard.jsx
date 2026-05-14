import React from "react";
import { useNavigate } from "react-router-dom";

function ExploreCoursesCard() {

  const navigate = useNavigate();

  return (

    <div className="rounded-[34px] bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-7 shadow-[0_15px_45px_rgba(15,23,42,0.05)]">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* LEFT */}
        <div className="max-w-2xl">

          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-600">
            Explore Courses
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
            Learn from expert-made courses
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Browse premium courses, improve your skills, and continue your learning journey with structured content.
          </p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() => navigate("/allcourses")}
            className="rounded-2xl bg-indigo-600 px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(79,70,229,0.25)] hover:bg-indigo-700 transition"
          >
            Explore Courses
          </button>

          <button
            onClick={() => navigate("/generate-ai")}
            className="rounded-2xl bg-white px-7 py-4 text-sm font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50 transition"
          >
            Generate AI Course
          </button>

        </div>
      </div>
    </div>
  );
}

export default ExploreCoursesCard;