import { useEffect, useState } from "react";

const LoadVideoComments = ({ videoId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://vtube-backend.onrender.com/api/v1/auth/video/${videoId}/comments`
        );
        const data = await response.json();
        setComments(data.comments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [videoId]);

  return (
    <div className="w-full flex flex-col space-y-4 p-4 bg-gray-900 rounded-lg">

      {comments.length > 0 ? (
        comments.map((comment) => (
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
        ))
      ) : (
        <p className="text-gray-400">No comments yet.</p>
      )}
    </div>
  );
};

export default LoadVideoComments;
