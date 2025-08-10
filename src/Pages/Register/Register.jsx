import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import RegAnimation from "../../../public/register.json";

export default function Register() {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setshowPassword] = useState(false);

  const validatePassword = (pass) => {
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const isLengthValid = pass.length >= 6;

    if (!hasUpperCase) {
      return "Password must include at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must include at least one lowercase letter.";
    }
    if (!isLengthValid) {
      return "Password must be at least 6 characters long.";
    }

    return "";
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const validationError = validatePassword(password);
    if (validationError) {
      setPasswordError(validationError);
      return;
    }

    setPasswordError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Registered Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500,
            });
            setUser(user);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="bg-[#493D9E] font-sevillana h-full">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl mx-auto px-4 py-8 lg:py-0">
        {/* Animation Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-1 mb-8 lg:mb-0">
          <Lottie
            animationData={RegAnimation}
            loop={true}
            className="w-64 h-64 sm:w-80 sm:h-80 lg:w-[500px] lg:h-[500px]"
          />
        </div>

        {/* Form Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center order-2 lg:order-2">
          <div className="w-full max-w-md lg:max-w-xl">
            <div className="flex justify-center min-h-[400px] lg:min-h-screen items-center">
              <div className="card bg-[#493D9E] w-full shrink-0">
                <h2 className="font-semibold text-xl md:text-2xl text-center text-white mb-4">
                  Register your account
                </h2>
                <form onSubmit={handleRegister} className="card-body px-4 lg:px-8">
                  <fieldset className="fieldset">
                    {/* Name */}
                    <label className="label text-sm lg:text-base text-white">Name</label>
                    <input
                      name="name"
                      type="text"
                      className="input w-full rounded-lg text-sm lg:text-base bg-white"
                      placeholder="Name"
                      required
                    />

                    {/* Photo URL */}
                    <label className="label text-sm lg:text-base mt-4 lg:mt-6 text-white">
                      Photo URL
                    </label>
                    <input
                      name="photo"
                      type="text"
                      className="input w-full rounded-lg text-sm lg:text-base bg-white"
                      placeholder="Photo URL"
                      required
                    />

                    {/* Email */}
                    <label className="label text-sm lg:text-base mt-4 lg:mt-6 text-white">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="input w-full rounded-lg text-sm lg:text-base bg-white"
                      placeholder="Email"
                      required
                    />

                    {/* Password */}
                    <label className="label text-sm lg:text-base mt-4 lg:mt-6 text-white">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="input w-full rounded-lg text-sm lg:text-base bg-white"
                        placeholder="Password"
                        required
                      />
                      <button
                        onClick={() => setshowPassword(!showPassword)}
                        className="btn btn-xs absolute top-2 lg:top-3 right-3 text-lg lg:text-2xl bg-white border-none"
                        type="button"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-red-400 text-xs lg:text-sm mt-1">{passwordError}</p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-neutral mt-4 text-sm lg:text-lg rounded-lg w-full"
                    >
                      Register
                    </button>

                    <div className="divider text-white text-sm lg:text-lg">or</div>

                    <button className="flex items-center justify-center gap-2 cursor-pointer w-full py-2 hover:bg-white/10 rounded-lg transition-colors">
                      <FcGoogle size={20} className="lg:w-6 lg:h-6" />
                      <span className="text-sm lg:text-lg text-white">Login with Google</span>
                    </button>

                    <p className="font-semibold text-center pt-6 lg:pt-8 text-base lg:text-xl text-white">
                      Already Have An Account?{" "}
                      <Link className="text-base lg:text-xl text-yellow-300 hover:underline" to="/login">
                        Login
                      </Link>
                    </p>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}