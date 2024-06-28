import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Welcome to Nodemailer App
          </h2>
          <p className="text-lg text-gray-700 mb-8 text-center">
            Choose an option to get started:
          </p>
          <div className="grid grid-cols-1 gap-4">
            <Link
              to="/signup"
              className="block bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md text-center font-semibold transition duration-300"
            >
              Sign Up
            </Link>
            <Link
              to="/signin"
              className="block bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md text-center font-semibold transition duration-300"
            >
              Sign In
            </Link>
            {/* <Link
              to="/sendemail"
              className="block bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-md text-center font-semibold transition duration-300"
            >
              Send Email
            </Link> */}
          </div>
        </div>
        <p className="text-sm text-center mb-5 text-gray-600 mt-4">
          Developed by Rishabh
        </p>
      </div>
    </div>
  );
};

export default Home;
