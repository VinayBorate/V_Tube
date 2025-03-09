import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import FileUploadAnimation from '../assets/FileUploadAnimation'
import '../assets/FileUploadAnimation.css'

const VideoUpload = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    resetForm(); // Clear the form when closing the modal
  };

  const resetForm = () => {
    setVideoTitle("");
    setDescription("");
    setAdminEmail("");
    setVideoFile(null);
  };

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("videoTitle", videoTitle);
    formData.append("description", description);
    formData.append("adminEmail", adminEmail);
    formData.append("videoFile", videoFile);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/auth/user/videoupload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        console.log("Video uploaded successfully!");
        closeModal(); // Close the modal after successful upload
      } else {
        console.error("Video upload failed:", response.status);
        // Handle error (e.g., display an error message)
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <div className="flex justify-center items-center  bg-slate-950">
      {/* <button
        className="bg-blue-800 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-md shadow-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={openModal}
      >
        <MdCloudUpload size={30}/>
        <span>Upload File</span>
      </button> */}

      {/* ____________________Upload Video Button_____________________________________  */}

      <div className="container ">
          <div className="folder">
            <div className="front-side">
              <div className="tip"></div>
              <div className="cover"></div>
            </div>
            <div className="back-side cover"></div>
          </div>
          <label className="custom-file-upload " onClick={openModal}>
            <input className="title"/>
            Upload a file
          </label>
        </div>

      {modalVisible && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
            className="fixed inset-0 transition-opacity"
            aria-hidden="true"
        >
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
        >
            &#8203;
        </span>
        <div className="inline-block align-bottom bg-slate-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-slate-900 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                        <h3
                            className="text-lg leading-6 font-medium text-gray-100"
                            id="modal-title"
                        >

                            Upload Video
                        </h3>
                        <div className="mt-2">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4 w-full">
                                    <label
                                        htmlFor="videoTitle"
                                        className="block text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]"
                                    >
                                        Video Title:<sup className="text-pink-600">*</sup>
                                    </label>
                                    <input
                                        type="text"
                                        id="videoTitle"
                                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                                        value={videoTitle}
                                        onChange={(e) => setVideoTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 w-full">
                                    <label
                                        htmlFor="description"
                                        className="block text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]"
                                    >
                                        Description:<sup className="text-pink-600">*</sup>
                                    </label>
                                    <textarea
                                        id="description"
                                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 w-full">
                                    <label
                                        htmlFor="adminEmail"
                                        className="block text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]"
                                    >
                                        Admin Email:<sup className="text-pink-600">*</sup>
                                    </label>
                                    <input
                                        type="email"
                                        id="adminEmail"
                                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                                        value={adminEmail}
                                        onChange={(e) => setAdminEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6 w-full">
                                    <label
                                        htmlFor="videoFile"
                                        className="block text-[0.875rem] text-gray-100 mb-1 leading-[1.375rem]"
                                    >
                                        Select Video File:<sup className="text-pink-600">*</sup>
                                    </label>
                                    <input
                                        type="file"
                                        id="videoFile"
                                        className="bg-slate-800 rounded-[0.75rem] w-full p-[12px] text-gray-100"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <button
                                        className="bg-yellow-400 py-[8px] rounded-[8px] font-medium text-gray-950 w-1/2 mr-2"
                                        type="submit"
                                    >
                                        Upload
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-transparent hover:bg-gray-600 text-gray-100 font-semibold py-2 px-4 rounded-[8px] focus:outline-none focus:shadow-outline border border-gray-600 w-1/2"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"></div>
        </div>
    </div>
</div>

             )}
    </div>
  );
};

export default VideoUpload;
