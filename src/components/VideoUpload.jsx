import React, { useState } from 'react';
 

const VideoUpload = () => {
 const [modalVisible, setModalVisible] = useState(false);
 const [videoTitle, setVideoTitle] = useState('');
 const [description, setDescription] = useState('');
 const [adminEmail, setAdminEmail] = useState('');
 const [videoFile, setVideoFile] = useState(null);


 const openModal = () => {
 setModalVisible(true);
 };


 const closeModal = () => {
 setModalVisible(false);
 resetForm(); // Clear the form when closing the modal
 };


 const resetForm = () => {
 setVideoTitle('');
 setDescription('');
 setAdminEmail('');
 setVideoFile(null);
 };


 const handleFileChange = (e) => {
 setVideoFile(e.target.files[0]);
 };


 const handleSubmit = async (e) => {
 e.preventDefault();


 const formData = new FormData();
 formData.append('videoTitle', videoTitle);
 formData.append('description', description);
 formData.append('adminEmail', adminEmail);
 formData.append('videoFile', videoFile);


 try {
 const response = await fetch('http://localhost:3000/api/v1/auth/user/videoupload', {
 method: 'POST',
 body: formData,
 });


 if (response.ok) {
 console.log('Video uploaded successfully!');
 closeModal(); // Close the modal after successful upload
 } else {
 console.error('Video upload failed:', response.status);
 // Handle error (e.g., display an error message)
 }
 } catch (error) {
 console.error('Error uploading video:', error);
 // Handle error (e.g., display an error message)
 }
 };


 return (
 <div className="flex justify-center items-center min-h-screen bg-gray-900">
 <button
 className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-md shadow-md flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
 onClick={openModal}
 >
 <svg
 xmlns="http://www.w3.org/2000/svg"
 fill="none"
 viewBox="0 0 24 24"
 strokeWidth="1.5"
 stroke="currentColor"
 className="w-6 h-6"
 >
 <path
 strokeLinecap="round"
 strokeLinejoin="round"
 d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.88-3.54L12 7.578a2.25 2.25 0 014.5 0l6.63 8.412a4.5 4.5 0 01-1.88 3.54H6.75z"
 />
 </svg>
 <span>Upload File</span>
 </button>


 {modalVisible && (
 <div className="fixed z-10 inset-0 overflow-y-auto">
 <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
 <div className="fixed inset-0 transition-opacity" aria-hidden="true">
 <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
 </div>


 <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
 <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
 <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
 <div className="sm:flex sm:items-start">
 <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
 <h3 className="text-lg leading-6 font-medium text-white" id="modal-title">
 Upload Video
 </h3>
 <div className="mt-2">
 <form onSubmit={handleSubmit}>
 <div className="mb-4">
 <label htmlFor="videoTitle" className="block text-gray-300 text-sm font-bold mb-2">
 Video Title:
 </label>
 <input
 type="text"
 id="videoTitle"
 className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 value={videoTitle}
 onChange={(e) => setVideoTitle(e.target.value)}
 required
 />
 </div>
 <div className="mb-4">
 <label htmlFor="description" className="block text-gray-300 text-sm font-bold mb-2">
 Description:
 </label>
 <textarea
 id="description"
 className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 required
 />
 </div>
 <div className="mb-4">
 <label htmlFor="adminEmail" className="block text-gray-300 text-sm font-bold mb-2">
 Admin Email:
 </label>
 <input
 type="email"
 id="adminEmail"
 className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 value={adminEmail}
 onChange={(e) => setAdminEmail(e.target.value)}
 required
 />
 </div>
 <div className="mb-6">
 <label htmlFor="videoFile" className="block text-gray-300 text-sm font-bold mb-2">
 Select Video File:
 </label>
 <input
 type="file"
 id="videoFile"
 className="shadow appearance-none border rounded w-full py-2 px-3 text-white bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
 accept="video/*"
 onChange={handleFileChange}
 required
 />
 </div>
 <div className="flex items-center justify-between">
 <button
 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
 type="submit"
 >
 Upload
 </button>
 <button
 type="button"
 className="bg-transparent hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline border border-gray-600"
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
 <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
 </div>
 </div>
 </div>
 </div>
 )}
 </div>
 );
};


export default VideoUpload;
