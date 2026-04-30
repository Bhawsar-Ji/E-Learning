import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import { serverUrl } from '../App';

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const {userData} = useSelector((state) => state.user)
  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const [progressData, setProgressData] = useState({
    completedLessons: [],
    lastWatchedLesson: null,
    progressPercentage: 0,
  });
  const progressInterval = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;

  const loadProgress = async () => {
    if (!courseId) return;
    try {
      const response = await axios.get(`${serverUrl}/api/progress/${courseId}`, {
        withCredentials: true,
      });
      const progress = response.data;
      const lastLecture = selectedCourse?.lectures?.find(
        (lecture) => lecture._id?.toString() === progress.lastWatchedLesson?.toString()
      );
      setProgressData({
        completedLessons: progress.completedLessons || [],
        lastWatchedLesson: progress.lastWatchedLesson,
        progressPercentage: progress.progressPercentage || 0,
      });
      if (lastLecture) {
        setSelectedLecture(lastLecture);
      }
    } catch (error) {
      console.error("Unable to load progress", error);
    }
  };

  const saveProgress = async (lessonId) => {
    if (!courseId || !lessonId || !selectedCourse?.lectures) return;
    try {
      const lectureIndex = selectedCourse.lectures.findIndex(
        (lecture) => lecture._id?.toString() === lessonId.toString()
      );
      const progressPercentage = selectedCourse.lectures.length
        ? Math.round(((lectureIndex + 1) / selectedCourse.lectures.length) * 100)
        : 0;

      const response = await axios.post(
        `${serverUrl}/api/progress/update`,
        {
          courseId,
          lessonId,
          progressPercentage,
        },
        { withCredentials: true }
      );

      setProgressData({
        completedLessons: response.data.completedLessons || progressData.completedLessons,
        lastWatchedLesson: response.data.lastWatchedLesson || lessonId,
        progressPercentage: response.data.progressPercentage || progressPercentage,
      });
    } catch (error) {
      console.error("Unable to save progress", error);
    }
  };

  const markLessonComplete = async (lessonId) => {
    if (!courseId || !lessonId) return;
    try {
      const response = await axios.patch(
        `${serverUrl}/api/progress/lesson-complete`,
        { courseId, lessonId },
        { withCredentials: true }
      );
      setProgressData({
        completedLessons: response.data.completedLessons || [],
        lastWatchedLesson: response.data.lastWatchedLesson || lessonId,
        progressPercentage: response.data.progressPercentage || progressData.progressPercentage,
      });
    } catch (error) {
      console.error("Unable to mark lesson complete", error);
    }
  };

  useEffect(() => {
    if (!selectedCourse) return;
    const startingLecture = selectedCourse?.lectures?.find(
      (lecture) => lecture._id?.toString() === progressData.lastWatchedLesson?.toString()
    ) || selectedCourse?.lectures?.[0] || null;
    setSelectedLecture(startingLecture);
    loadProgress();
  }, [courseId, selectedCourse]);

  useEffect(() => {
    if (!selectedLecture) return;

    saveProgress(selectedLecture._id);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }

    progressInterval.current = setInterval(() => {
      saveProgress(selectedLecture._id);
    }, 30000);

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [selectedLecture, selectedCourse]);

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, []);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    // Handle youtu.be short links
    let videoIdMatch = url.match(/youtu\.be\/([^\?&]+)/);
    if (videoIdMatch) return `https://www.youtube.com/embed/${videoIdMatch[1]}`;

    // Handle normal and mobile links
    videoIdMatch = url.match(/[?&]v=([^&]+)/);
    if (videoIdMatch) return `https://www.youtube.com/embed/${videoIdMatch[1]}`;

    // Handle /embed/ links (already correct)
    if (url.includes("/embed/")) return url;

    // Fallback: try to extract after last slash
    const lastSlash = url.lastIndexOf("/");
    if (lastSlash !== -1) {
      const id = url.substring(lastSlash + 1);
      if (id.length >= 11) return `https://www.youtube.com/embed/${id}`;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col md:flex-row gap-6">
      {/* Left - Video & Course Info */}
      <div className="w-full md:w-2/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        {/* Course Details */}
        <div className="mb-6" >
           
          <h1 className="text-2xl font-bold flex items-center justify-start gap-[20px]  text-gray-800"><FaArrowLeftLong  className=' text-black w-[22px] h-[22px] cursor-pointer' onClick={()=>navigate("/")}/>{selectedCourse?.title}</h1>
          
          <div className="mt-2 flex gap-4 text-sm text-gray-500 font-medium">
            <span>Category: {selectedCourse?.category}</span>
            <span>Level: {selectedCourse?.level}</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-4 border border-gray-300">
          {selectedLecture?.youtubeLink ? (
            <iframe
              width="100%"
              height="100%"
              src={getYouTubeEmbedUrl(selectedLecture.youtubeLink)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : selectedLecture?.videoUrl ? (
            <video
              ref={videoRef}
              src={selectedLecture.videoUrl}
              controls
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
              onEnded={() => markLessonComplete(selectedLecture._id)}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a lecture to start watching
            </div>
          )}
        </div>

        {/* Selected Lecture Info */}
        <div className="mt-2">
          <h2 className="text-lg font-semibold text-gray-800">{selectedLecture?.lectureTitle}</h2>
          
          {/* Display uploaded resource files (PDF/DOC) */}
          {selectedLecture?.files && selectedLecture.files.length > 0 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Lecture Resources</h4>
              <ul className="space-y-2">
                {selectedLecture.files.map((file, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">📄</span>
                    <a 
                      href={file.url.startsWith('http') ? file.url : `${serverUrl}${file.url}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {file.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {selectedLecture && (
            progressData.completedLessons?.some(
              (item) => item?.toString() === selectedLecture._id?.toString()
            ) ? (
              <p className="mt-2 text-sm font-medium text-green-600">This lesson is completed.</p>
            ) : (
              <button
                onClick={() => markLessonComplete(selectedLecture._id)}
                className="mt-3 inline-flex rounded-2xl bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Mark as Complete
              </button>
            )
          )}
        </div>
      </div>

      {/* Right - All Lectures + Creator Info */}
      <div className="w-full md:w-1/3 bg-white rounded-2xl shadow-md p-6 border border-gray-200 h-fit">
        <h2 className="text-xl font-bold mb-4 text-gray-800">All Lectures</h2>
        <div className="flex flex-col gap-3 mb-6">
          {selectedCourse?.lectures?.length > 0 ? (
            selectedCourse.lectures.map((lecture, index) => {
              const isCompleted = progressData.completedLessons?.some(
                (item) => item?.toString() === lecture._id?.toString()
              );
              return (
                <button
                  key={index}
                  onClick={() => setSelectedLecture(lecture)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition text-left ${
                    selectedLecture?._id === lecture._id
                      ? 'bg-gray-200 border-gray-500'
                      : 'hover:bg-gray-50 border-gray-300'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{lecture.lectureTitle}</h4>
                    {isCompleted && (
                      <p className="text-xs text-green-600">Completed</p>
                    )}
                  </div>
                  <FaPlayCircle className="text-black text-xl" />
                </button>
              )
            })
          ) : (
            <p className="text-gray-500">No lectures available.</p>
          )}
        </div>

        {/* Creator Info */}
        {courseCreator && (
  <div className="mt-4 border-t pt-4">
    <h3 className="text-md font-semibold text-gray-700 mb-3">Instructor</h3>
    <div className="flex items-center gap-4">
      <img
        src={courseCreator.photoUrl || '/default-avatar.png'}
        alt="Instructor"
        className="w-14 h-14 rounded-full object-cover border"
      />
      <div>
        <h4 className="text-base font-medium text-gray-800">{courseCreator.name}</h4>
        <p className="text-sm text-gray-600">
          {courseCreator.description || 'No bio available.'}
        </p>
      </div>
    </div>
  </div>
        )}
      </div>
    </div>
  );
}

export default ViewLecture;
