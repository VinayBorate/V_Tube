import React, { useState, useEffect } from "react";

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/user/getAllVideo"
        );
        const data = await response.json();

        if (data.success) {
          setVideos(data.videos);
        } else {
          console.error("Failed to fetch videos:", data.message);
          // Handle error appropriately (e.g., display an error message to the user)
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
        // Handle network errors or other exceptions
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="rounded-lg shadow-md overflow-hidden bg-slate-900  sm:h-96"
        >
          <div className="relative">
            <video
              width="100%"
              height="auto"
              controls
              muted
              className="block w-full"
            >
              <source src={video.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Optional: Add a timestamp overlay if you have that data
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs py-1 px-2 rounded">
              31:18
            </div>
            */}
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-50 line-clamp-2">
              {video.videoTitle}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center mt-2 gap-4">
              {/*  Replace with actual channel logo */}
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={video.adminPic}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                {/* Replace with actual channel name */}
                <p className="text-xs text-gray-700">{video.adminEmail}</p>
                <p className="text-xs text-gray-500">
                  10K views • 1 day ago
                </p>{" "}
                {/* Replace with actual view count and upload date */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
