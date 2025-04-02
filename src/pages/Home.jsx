import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultThumbnail from "../assets/defaultThumbnailVideoImg.jpg";
import Spinner from "../assets/LoderSpin.json";
import Lottie from "lottie-react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/auth/user/getAllVideo`
        );
        const data = await response.json();

        if (data.success) {
          setVideos(data.videos);
        } else {
          console.error("Failed to fetch videos:", data.message);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setIsLoading(false);
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
          className="rounded-lg shadow-md overflow-hidden bg-slate-900 sm:h-96 cursor-pointer"
          onClick={() => navigate(`/video/${video._id}`)}
        >
          <div className="relative">
            <img
              src={video.thumbnailURL || defaultThumbnail}
              alt={video.videoTitle}
              className="w-full h-48 object-contain"
            />
          </div>

          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-50">
              {video.videoTitle}
            </h3>
            <p className="text-sm text-gray-500">{video.description}</p>
            <div className="flex items-center mt-2 gap-4">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={video.adminPic || defaultThumbnail}
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-gray-300">{video.adminEmail}</p>
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
