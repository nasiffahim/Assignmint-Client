import Lottie from "lottie-react";
import React, { use, useState } from "react";
import LogInAnimation from "../../../public/login.json";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../Provider/AuthContext";
import Swal from "sweetalert2";

export default function LogIn() {
  const { logIn } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="bg-[#309898] font-sevillana text-white min-h-screen">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full max-w-6xl mx-auto px-4 py-8 lg:py-0">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-1">
          <div className="w-full max-w-md lg:max-w-xl">
            <div className="flex justify-center min-h-[400px] lg:min-h-screen items-center">
              <div className="card bg-[#309898] w-full shrink-0 py-5 min-h-[500px]">
                <h2 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center mb-4">
                  Login your account
                </h2>
                <form onSubmit={handleLogIn} className="card-body mt-5 px-4 lg:px-8">
                  <fieldset className="fieldset">
                    {/* Email */}
                    <div className="space-y-2">
                      <label className="label text-base lg:text-lg">Email</label>
                      <input
                        name="email"
                        type="email"
                        className="input w-full rounded-lg text-black text-sm lg:text-base bg-white"
                        placeholder="Email"
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <label className="label text-base lg:text-lg mt-4 lg:mt-6">Password</label>
                      <div className="relative">
                        <input
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="input w-full rounded-lg text-black text-sm lg:text-base bg-white"
                          placeholder="Password"
                          required
                        />
                        <button
                          onClick={() => setshowPassword(!showPassword)}
                          className="btn btn-xs absolute top-2 lg:top-3 right-3 text-lg lg:text-2xl bg-base-100 border-none text-black"
                          type="button"
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <NavLink
                        to="/auth/reset-password"
                        className="link link-hover text-base lg:text-xl"
                      >
                        Forgot password?
                      </NavLink>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-neutral mt-4 lg:mt-6 text-base lg:text-xl rounded-lg w-full"
                    >
                      Login
                    </button>

                    <div className="divider text-white text-sm lg:text-lg">or</div>

                    <button className="flex items-center justify-center gap-2 cursor-pointer w-full py-2 hover:bg-white/10 rounded-lg transition-colors">
                      <FcGoogle size={20} className="lg:w-6 lg:h-6" />
                      <span className="text-base lg:text-lg text-white">
                        Login with Google
                      </span>
                    </button>

                    <p className="font-semibold text-center pt-5 text-base lg:text-xl">
                      Don't Have An Account?{" "}
                      <Link className="text-black text-base lg:text-xl hover:underline" to="/register">
                        Register
                      </Link>
                    </p>

                    {error && (
                      <p className="text-base lg:text-xl text-center font-semibold text-red-600 mt-2">
                        {error}
                      </p>
                    )}
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0">
          <Lottie
            animationData={LogInAnimation}
            loop={true}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}