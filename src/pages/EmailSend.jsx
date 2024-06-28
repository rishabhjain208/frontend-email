import React from "react";
import { useNavigate } from "react-router-dom";
import { BiLogoGmail } from "react-icons/bi";

const SendEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 md:w-1/3 sm:w-2/3 w-11/12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Send Email
        </h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate("/sendimmediately")}
            type="button"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <BiLogoGmail size={24} />
            <span>Send Immediately</span>
          </button>
          <button
            onClick={() => navigate("/aftertime")}
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <BiLogoGmail size={24} />
            <span>Send After Time</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
