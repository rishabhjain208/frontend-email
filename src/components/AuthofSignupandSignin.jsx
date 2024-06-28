import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AuthofSignupandSignin = ({ type }) => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `https://backend-email-4.onrender.com/api/v1/auth/${type}`,
        inputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      // Show success toast
      toast.success(`${type === "signup" ? "Signup" : "Login"} successful!`);

      // Redirect after toast
      if (type === "signup") {
        navigate("/signin");
      } else {
        navigate("/sendemail");
      }
    } catch (error) {
      // Show error toast
      toast.error("Error submitting form. Please try again later.");
      console.error("Error submitting form:", error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center  ">
        <div>
          <div className="px-10  font-bold text-3xl">
            {type === "signup" ? "Create" : "Login"} an user
          </div>
          <p className="text-sm mt-2 ml-10 text-gray-500">
            {type === "signup" ? "Already " : "Don't "}have an account ?{" "}
            {type === "signup" ? (
              <Link to="/signin" className="underline">
                Login
              </Link>
            ) : (
              <Link className="underline" to="/signup">
                Signup
              </Link>
            )}
          </p>
          <div className="pt-8">
            {type === "signup" ? (
              <LabelInput
                label="UserName"
                type="text"
                placeholder="Enter your username"
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    name: e.target.value,
                  });
                }}
              ></LabelInput>
            ) : null}
            <LabelInput
              label="Email"
              type="email"
              placeholder="abc@example.com"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  email: e.target.value,
                });
              }}
            ></LabelInput>
            <LabelInput
              label="password"
              type="password"
              placeholder="Abc@123"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  password: e.target.value,
                });
              }}
            ></LabelInput>
          </div>
          {/* onClick={buttonHandler}  */}
          <button
            onClick={sendRequest}
            type="button"
            className="text-white w-full mt-8 focus:ring-2 bg-gradient-to-br bg-black hover:bg-gray-900 focus:outline-none focus:ring-black  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {type === "signin" ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Resuable function of the inputs fields
function LabelInput({ label, placeholder, type, onChange }) {
  return (
    <div>
      <label className="block mb-2  font-medium text-gray-900 ">{label}</label>
      <input
        type={type}
        onChange={onChange}
        className="bg-gray-50 border border-gray-500 text-slate-900 text-sm rounded-lg focus:outline-none  focus:border-sky-500 focus:ring-1 focus:ring-sky-500 block w-full p-2.5  "
        placeholder={placeholder}
      />
    </div>
  );
}

export default AuthofSignupandSignin;
