/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { registerAsyncThunk } from "../features/user/userSclice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signUpForm, setSignUpForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !signUpForm.name ||
      !signUpForm.email ||
      !signUpForm.password ||
      !signUpForm.age ||
      !signUpForm.gender
    ) return;

    const res = await dispatch(registerAsyncThunk(signUpForm));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");
    } else {
      setErrorMessage(res.payload); // Set error message if registration fails
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between px-6 py-8 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="w-full text-purple-600 mb-2 text-5xl font-bold font-['Inter'] tracking-tight">
          Sign Up
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-purple-600 text-3xl font-bold font-['Inter']"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={signUpForm.name}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-purple-600 text-3xl font-bold font-['Inter']"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={signUpForm.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-purple-600 text-3xl font-bold font-['Inter']"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={signUpForm.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="age"
                className="block text-purple-600 text-3xl font-bold font-['Inter']"
              >
                Age
              </label>
            </div>
            <div className="mt-2">
              <input
                id="age"
                name="age"
                type="number"
                value={signUpForm.age}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 p-1.5 text-purple-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="gender"
                className="block text-purple-600 text-3xl font-bold font-['Inter']"
              >
                Gender
              </label>
            </div>
            <div className="mt-2">
              <select
                name="gender"
                id="gender"
                value={signUpForm.gender}
                onChange={handleChange}
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              >
                <option value="other">Other</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p> // Display error message
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-bold leading-6 text-black shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
