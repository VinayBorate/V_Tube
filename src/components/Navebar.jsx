import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import logo from "../assets/logo.png";
import { FaRegUser } from "react-icons/fa";

// Tostfy library is imported
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = (props) => {
  let isLogin = props.isLogin;
  let setisLogin = props.setisLogin;

  // getting the current location or path
  const currentPath = props.currentPath;
  // console.log(currentPath.pathname);
  const hideSearchPaths = ["/login", "/signup", "/dashboard"];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [myData, setmyData] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", searchQuery);
    // Add logic here to handle the search query
  };

  // Tost
  // const notify = () => toast("Wow so easy!");
  const notify = () => {
    toast.success("Logout Successfully", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    });
  };

  // UseEffect to get the user data as soon as the component mount
  useEffect(() => {
    // *******Getting the data of the user *************
    const storedUser = localStorage.getItem("userDetail"); // Get stored user data as a string

    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser); // Parse it into an object
        setmyData(userData); // Set the user data to state
        console.log("This is the Normal user data:", userData);
        console.log("First Name:", userData.firstName); // Now it works
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [props.isLogin]); // Empty dependency array means this effect runs once on mount

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
        </a>

        {!hideSearchPaths.includes(currentPath.pathname) && (
          <div className="flex items-center">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm text-white bg-gray-800 rounded-r-lg hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                Search
              </button>
            </form>
          </div>
        )}

        <div className="flex items-center md:order-2 space-x-3">
          {/* ****************Profile Button**************************** */}
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="sr-only">Open user menu</span>
            {isLogin && myData.image ? (
              <img
                className="w-8 h-8 rounded-full"
                src={myData.image}
                alt="user photo"
              />
            ) : (
              <FaRegUser className="w-8 h-8 text-gray-500" />
            )}
          </button>

          {/* ***************My DropDown Menu ****************** */}
          {isDropdownOpen && (
            <div className="absolute right-10 mt-64 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 z-10">
              {isLogin && (
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {myData.firstName} {myData.lastName}
                  </span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                    {myData.email}
                  </span>
                </div>
              )}
              <ul className="py-2">
                <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  <Link to="/" onClick={() => setIsDropdownOpen(false)}>
                    Home
                  </Link>
                </li>

                {isLogin && (
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link
                      to="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                )}

                {!isLogin && (
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link to="/login" onClick={() => setIsDropdownOpen(false)}>
                      Login
                    </Link>
                  </li>
                )}

                {!isLogin && (
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link to="/signup" onClick={() => setIsDropdownOpen(false)}>
                      Signup
                    </Link>
                  </li>
                )}

                {isLogin && (
                  <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    <Link
                      to="/signup"
                      onClick={async () => {
                        localStorage.removeItem("userDetail"); // Remove token from storage
                        localStorage.removeItem("authToken");
                        setisLogin(false); // Update UI state

                        try {
                          await fetch(
                            "http://localhost:3000/api/v1/auth/user/logout",
                            {
                              method: "GET",
                              credentials: "include", // Ensures cookies are sent
                            }
                          );
                        } catch (error) {
                          console.error("Logout failed:", error);
                        }
                        setIsDropdownOpen(false);
                        notify();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
