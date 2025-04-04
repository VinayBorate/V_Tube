// import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const VideoPlayer = ({ videoURL, userData }) => {
//   const [watchedTime, setWatchedTime] = useState(0);
//   const [isTimeOver, setIsTimeOver] = useState(false);
//   const videoRef = useRef(null);
//   const navigate = useNavigate();
//   const [adminData, setAdminData] = useState({});

//   const timeLimits = {
//     free: 5 * 60,     // 5 minutes in seconds
//     bronze: 7 * 60,   // 7 minutes
//     silver: 10 * 60,  // 10 minutes
//     gold: Infinity,   // unlimited
//   };
  

//   useEffect(() => {
//     const fetchAdminData = async () => {
//         try{
//             const response = await fetch(`${BASE_URL}/api/v1/auth/${userData._id}/UserDetail`);
//             const data = await response.json();

//             if (data.success) {
//                 setadminData(data);
//               } else {
//                 console.error("Failed to fetch Admindata:");
//               }
//         }catch(error){
//            console.error("Error while Getting the Admin data");
//         }
//     }
//     fetchAdminData();
//   },[]);

//   const maxAllowedTime = timeLimits[adminData.accountType] || 0;

//   const handleTimeUpdate = () => {
//     const currentTime = videoRef.current.currentTime;
//     setWatchedTime(currentTime);

//     if (currentTime >= maxAllowedTime && maxAllowedTime !== Infinity) {
//       setIsTimeOver(true);
//       videoRef.current.pause();
//     }
//   };

//   const handleUpgrade = () => {
//     navigate("/payment");
//   };

//   return (
//     <div className="w-full max-h-screen">
//       {!isTimeOver ? (
//         <video
//           controls
//           ref={videoRef}
//           onTimeUpdate={handleTimeUpdate}
//           className="w-full rounded-lg max-h-screen"
//           style={{
//             objectFit: "contain",
//             margin: "0 auto",
//           }}
//         >
//           <source src={videoURL} type="video/mp4" />
//         </video>
//       ) : (
//         <div className="flex flex-col items-center justify-center h-screen w-full p-4 bg-black text-white rounded-lg">
//           <p className="mb-4 text-lg font-semibold">Your watch time is over for your current plan.</p>
//           <button
//             onClick={handleUpgrade}
//             className="px-6 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
//           >
//             Upgrade Plan
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;


import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const VideoPlayer = ({ videoURL, userData }) => {
  const [watchedTime, setWatchedTime] = useState(0);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [adminData, setAdminData] = useState({});
  const videoRef = useRef(null);
  const navigate = useNavigate();

  const timeLimits = {
    free: 5 * 60,     // 5 minutes in seconds
    bronze: 7 * 60,   // 7 minutes
    silver: 10 * 60,  // 10 minutes
    gold: Infinity,   // unlimited
  };

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/v1/auth/${userData._id}/UserDetail`);
        const data = await response.json();

        if (data.success) {
          setAdminData(data.data);  // `data` is wrapped inside `data.data`
        } else {
          console.error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error while fetching admin data:", error);
      }
    };

    if (userData && userData._id) {
        fetchAdminData();
      }

  }, []);

  
  const maxAllowedTime =
  userData 
    ? timeLimits[adminData.accountType] || 0
    : timeLimits["free"] || 0;


  const handleTimeUpdate = () => {
    const currentTime = videoRef.current.currentTime;
    setWatchedTime(currentTime);

    if (currentTime >= maxAllowedTime && maxAllowedTime !== Infinity) {
      setIsTimeOver(true);
      videoRef.current.pause();
    }
  };

  const handleUpgrade = () => {
    navigate("/payment");
  };

  return (
    <div className="w-full max-h-screen">
      {!isTimeOver ? (
        <video
          controls
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          className="w-full rounded-lg max-h-screen"
          style={{
            objectFit: "contain",
            margin: "0 auto",
          }}
        >
          <source src={videoURL} type="video/mp4" />
        </video>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen w-full p-4 bg-black text-white rounded-lg">
          <p className="mb-4 text-lg font-semibold">Your watch time is over for your current plan.</p>
          <button
            onClick={handleUpgrade}
            className="px-6 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition"
          >
            Upgrade Plan
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
