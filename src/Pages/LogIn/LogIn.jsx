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
    <div className="bg-[#309898] font-sevillana text-white">
      <div className="flex justify-center items-center w-10/12 mx-auto">
        <div className="w-[50%]">
          <div className="flex justify-center min-h-screen items-center">
            <div className="card bg-[#309898] w-full max-w-xl shrink-0 py-5 min-h-[500px]">
              <h2 className="font-semibold text-4xl text-center">
                Login your account
              </h2>
              <form onSubmit={handleLogIn} className="card-body mt-5">
                <fieldset className="fieldset">
                  {/* email  */}
                  <div className="space-y-2">
                    <label className="label text-lg">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="input w-full rounded-lg text-black"
                      placeholder="Email"
                      required
                    />
                  </div>

                  {/* passowrd  */}
                  <div className="space-y-2">
                    <label className="label text-lg mt-6">Password</label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input w-full rounded-lg text-black"
                        placeholder="Password"
                        required
                      />
                      <button
                        onClick={() => setshowPassword(!showPassword)}
                        className="btn btn-xs absolute top-3 right-3 text-2xl bg-base-100 border-none"
                        type="button"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <NavLink
                      to="/auth/reset-password"
                      className="link link-hover text-xl"
                    >
                      Forgot password?
                    </NavLink>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-neutral mt-6 text-xl rounded-lg"
                  >
                    Login
                  </button>

                  <div className="divider text-white text-lg">or</div>

                  <button className="flex items-center justify-center gap-2 cursor-pointer">
                    <FcGoogle
                     size={24} />{" "}
                    <span className="text-lg text-white">
                      Login with Google
                    </span>
                  </button>

                  <p className="font-semibold text-center pt-5 text-xl">
                    Dont’t Have An Account ?{" "}
                    <Link className="text-black text-xl" to="/register">
                      Register
                    </Link>
                  </p>

                  <p className="text-xl text-center font-semibold text-red-600">
                    {error}
                  </p>
                </fieldset>
              </form>
            </div>
          </div>
        </div>

        <div className="w-[50%] flex justify-center items-center">
          <Lottie
            animationData={LogInAnimation}
            loop={true}
            style={{ width: 500, height: 500 }}
          ></Lottie>
        </div>
      </div>
    </div>
  );
}
