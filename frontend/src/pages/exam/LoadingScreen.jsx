function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="text-center">

        <div className="w-14 h-14 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />

        <h1 className="text-2xl font-semibold mt-5 text-gray-700">
          Loading Exam...
        </h1>

        <p className="text-gray-500 mt-2">
          Please wait a moment
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;