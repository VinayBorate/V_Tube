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
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/video/${video._id}`)}
    >
      {/* Thumbnail */}
      <img
        src={video.thumbnailURL || defaultThumbnail}
        alt={video.videoTitle}
        className="w-full h-52 object-cover"
      />

      {/* Video Details */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-white">
          {video.videoTitle}
        </h3>
        <p className="text-xs text-gray-400">{video.description}</p>

        <div className="flex items-center gap-2 mt-3">
          {/* Admin Profile Picture */}
          <img
            src={video.adminPic || defaultThumbnail}
            alt="Admin"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-xs text-gray-400">{video.adminEmail}</p>
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
