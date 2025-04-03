import { useState, useEffect } from "react";
import { FaThumbsUp } from "react-icons/fa";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const LikeButton = ({ videoId, userId }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/video/${videoId}/likes`);
        const data = await response.json(); // <-- Convert response to JSON
        setLikeCount(data.likeCount);
        setLiked(data.likedByUser);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [videoId, userId]);
  

  const handleLikeToggle = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/video/${videoId}/like`, {
        method: "POST", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
  
      const data = await response.json(); // <-- Convert response to JSON
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };
  

  return (
    <button
      onClick={handleLikeToggle}
      className={`flex items-center space-x-2 text-white mt-3 ${liked ? "text-blue-500" : "text-gray-400"}`}
    >
      <FaThumbsUp size={20} />
      <span>{likeCount}</span>
    </button>
  );
};

export default LikeButton;
