import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import YogaLogo from "../components/YogaLogo";

import {
  loginAsyncThunk,
  selectUserError,
  selectUserLoading,
} from "../features/user/userSclice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector(selectUserError);
  const loading = useSelector(selectUserLoading);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) return;

    const res = await dispatch(loginAsyncThunk(loginForm));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  };

  return (
    <>
      <YogaLogo>
        <div className="flex min-h-full h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="w-full text-white mb-5 text-5xl font-bold font-['Inter'] tracking-tight">
              Log in
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-white text-3xl font-bold font-['Inter']"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={loginForm.email}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-white text-3xl font-bold font-['Inter']"
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
                    value={loginForm.password}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                  />
                  <div className="text-sm  my-2">
                    <Link className="font-semibold text-red-500 hover:text-red-700">
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-500 text-black px-3 py-1.5 text-sm font-bold leading-6 shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-300">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold mx-2 leading-6 text-yellow hover:text-gray-300"
              >
                Sign Up to become a member
              </Link>
            </p>
          </div>
        </div>
      </YogaLogo>
    </>
  );
};

export default Login;
