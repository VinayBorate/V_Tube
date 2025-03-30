import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import defaultThumbnail from "../assets/defaultThumbnailVideoImg.jpg";

const ViewVideo = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      setIsLoading(true); // Ensure loading state resets on new video fetch
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/auth/user/getVideo/${videoId}`
        );
        const data = await response.json();
        if (data.success) {
          setVideo(data.video);
        } else {
          console.error("Error: Video not found");
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]); // ✅ Ensures fetching new video when videoId changes

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/auth/user/getAllVideo"
        );
        const data = await response.json();
        if (data.success) {
          setVideos(data.videos);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  if (isLoading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  return (
    <div key={videoId} className="flex flex-col md:flex-row p-4">
      {/* ✅ Key added to force re-render when videoId changes */}
      <div className="w-full md:w-3/4 p-2">
        {video && (
          <>
            {/* Video Display */}
            <video controls className="w-full rounded-lg">
              <source src={video.videoURL} type="video/mp4" />
            </video>

            {/* chanel Pic */}
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <img
                src={video.adminPic || defaultThumbnail}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 className="text-xl font-semibold text-white mt-3">
              {video.videoTitle}
            </h1>
            <p className="text-gray-400 mb-4">{video.description}</p>
            <div className="w-full h-1 bg-gray-300"></div>
          </>
        )}
      </div>

      {/* Show All Videoes */}
      <div className="w-full md:w-1/4 p-2">
        <h2 className="text-lg font-semibold text-white mb-3">
          Recommended Videos
        </h2>
        <div className="space-y-4">
          {videos.map((v) => (
            <div
              key={v._id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/video/${v._id}`)}
            >
              {/* Thumbnail */}
              <img
                src={v.thumbnailURL || defaultThumbnail}
                alt={v.videoTitle}
                className="w-full h-40 object-cover"
              />
              {/* Video Details */}
              <div className="p-4">
                <h3 className="text-white text-sm font-semibold">
                  {v.videoTitle}
                </h3>
                <p className="text-gray-400 text-xs">{v.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  {/* Admin Profile Picture */}
                  <img
                    src={v.adminPic || defaultProfilePic}
                    alt={v.adminEmail}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-gray-400 text-xs">{v.adminEmail}</p>
                    {/* Additional Info (e.g., views and date) */}
                    <p className="text-gray-500 text-xs">
                      10K views • 1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewVideo;
