import { useEffect, useState } from "react";

const LoadVideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [showAllComments, setShowAllComments] = useState(false);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/auth/video/${videoId}/comments`
        );
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [videoId]);

  // Get either first 3 comments or all comments based on state
  const displayedComments = showAllComments ? comments : comments.slice(0, 3);

  return (
    <div className="w-full flex flex-col space-y-4 p-4 bg-gray-900 rounded-lg">
      {displayedComments.length > 0 ? (
        <>
          {displayedComments.map((comment) => (
            <div key={comment._id} className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg shadow-md">
              <img
                src={comment.user.image}
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-white font-bold">{comment.user.email}</p>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
          
          {/* Show "See More" button if there are more comments to show */}
          {comments.length > 3 && !showAllComments && (
            <button
              onClick={() => setShowAllComments(true)}
              className="text-blue-400 hover:text-blue-300 font-medium self-start"
            >
              See more comments ({comments.length - 3} more)
            </button>
          )}
          
          {/* Show "See Less" button when all comments are shown */}
          {comments.length > 3 && showAllComments && (
            <button
              onClick={() => setShowAllComments(false)}
              className="text-blue-400 hover:text-blue-300 font-medium self-start"
            >
              See less
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default LoadVideoComments;
