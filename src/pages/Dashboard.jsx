import React, { useState, useEffect } from "react";
import VideoUpload from "../components/VideoUpload";
import FileUploadAnimation from "../assets/FileUploadAnimation";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [adminData, setAdminData] = useState({});
  const [localData, setLocalData] = useState({});

  // Step 1: Load user data from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetail");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setLocalData(userData);
      } catch (error) {
        console.error("Error parsing local user data:", error);
      }
    }
  }, []);

  // Step 2: Fetch real-time user data from server
  useEffect(() => {
    if (!localData?._id) return;

    const fetchAdminData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/v1/auth/${localData._id}/UserDetail`
        );
        const data = await response.json();

        if (data.success) {
          setAdminData(data.data);
        } else {
          console.error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error while fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [localData._id]);

  return (
    <div className="flex flex-col p-4 gap-4">
      {/* User Info Card */}
      <div className="flex items-center gap-4 border p-4 rounded-md shadow-sm bg-gray-800 text-white">
        <img
          src={adminData.image}
          alt="User Avatar"
          className="w-16 h-16 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {adminData.firstName} {adminData.lastName}
          </h2>
          <p className="text-sm">Email: {adminData.email}</p>
          <p className="text-sm capitalize">
            Account Type: {adminData.accountType}
          </p>
        </div>
      </div>

      {/* Video Upload Section */}
      <div className="border-2 border-dotted border-blue-500 p-4 rounded-md w-full">
        <VideoUpload adminData={adminData} />
      </div>
    </div>
  );
};

export default Dashboard;
