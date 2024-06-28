import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLogoGmail } from "react-icons/bi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendImmediately = () => {
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const buttonHandler = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("No token found. Please log in again.");
        return;
      }
      const res = await axios.post(
        "https://backend-email-4.onrender.com/api/v1/email/sendmail",
        {
          to,
          subject,
          text: body,
          time: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Email sent successfully!");
      navigate("/sendEmail");
    } catch (error) {
      toast.error("Error sending email. Please try again later.");
      console.log("Error sending email:", error);
      navigate("/sendEmail");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Send Email
        </h1>
        <form onSubmit={buttonHandler}>
          <div className="mt-3">
            <label
              htmlFor="to"
              className="block mb-2 font-medium text-gray-800"
            >
              To:
            </label>
            <input
              type="email"
              onChange={(e) => setTo(e.target.value)}
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Recipient email"
              required
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="subject"
              className="block mb-2 font-medium text-gray-800"
            >
              Subject:
            </label>
            <input
              type="text"
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email subject"
              required
            />
          </div>
          <div className="mt-3">
            <label
              htmlFor="body"
              className="block mb-2 font-medium text-gray-800"
            >
              Body:
            </label>
            <textarea
              name="body"
              onChange={(e) => setBody(e.target.value)}
              className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              rows="3"
              placeholder="Email body"
              required
            ></textarea>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <BiLogoGmail size={24} />
              <span>Send Immediately</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendImmediately;
