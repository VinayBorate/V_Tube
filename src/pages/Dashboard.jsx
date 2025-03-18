import React from 'react'
import {useState,useEffect} from 'react';
import VideoUpload from '../components/VideoUpload';
import FileUploadAnimation from '../assets/FileUploadAnimation'

const Dashboard = () => {

  const[adminData,setadminData] = useState("");

  useEffect(() => {
      // *******Getting the data of the user *************
      const storedUser = localStorage.getItem("userDetail"); // Get stored user data as a string
  
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser); // Parse it into an object
          setadminData(userData); // Set the user data to state
          //console.log("This is the Normal user data:", userData);
          //console.log("First Name:", userData.firstName); // Now it works
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }, [])

  return (
    <div className='flex p-3 m-3'>
      <div className="border-2 border-dotted border-blue-500 p-4 inline-block rounded-md w-full h-5/6" >
      <VideoUpload adminData={adminData} />
      
    </div>
    </div>
    
  )
}

export default Dashboard