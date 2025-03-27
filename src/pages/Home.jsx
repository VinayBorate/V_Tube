import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import Spinner from "../assets/LoderSpin.json";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


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
      }  finally {
        setIsLoading(false); // Stop loading when data is fetched
      }
    };

    fetchVideos();
  }, []);

  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Lottie animationData={Spinner} className="h-44" />
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {videos.map((video) => (
        <div
          key={video._id}
          className="rounded-lg shadow-md overflow-hidden bg-slate-900 sm:h-96"
        >
          <div className="relative">
            <video
              width="100%"
              height="100%"
              controls
              muted
              className="block w-full"
            >
              <source src={video.videoURL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
  
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-50 line-clamp-2">
              {video.videoTitle}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {video.description}
            </p>
            <div className="flex items-center mt-2 gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={video.adminPic}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-gray-700">{video.adminEmail}</p>
                <p className="text-xs text-gray-500">10K views • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  

  };

export default Home;
