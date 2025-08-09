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

        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="bg-[#493D9E] font-sevillana">
      <div className="flex items-center w-10/12 mx-auto">
        <div className="w-[50%]">
          <Lottie
            animationData={RegAnimation}
            loop={true}
            style={{ width: 500, height: 500 }}
          ></Lottie>
        </div>

        <div className="w-[50%]">
          <div className="flex justify-center min-h-screen items-center">
            <div className="card bg-[#493D9E] w-full shrink-0 py-5 min-h-[500px]">
              <h2 className="font-semibold text-2xl text-center text-white">
                Register your account
              </h2>
              <form onSubmit={handleRegister} className="card-body">
                <fieldset className="fieldset">
                  {/* Name  */}
                  <label className="label text-sm text-white">Name</label>
                  <input
                    name="name"
                    type="text"
                    className="input w-full rounded-lg"
                    placeholder="Name"
                    required
                  />

                  {/* Photo URl  */}
                  <label className="label text-sm mt-6 text-white">
                    Photo URL
                  </label>
                  <input
                    name="photo"
                    type="text"
                    className="input w-full rounded-lg"
                    placeholder="Photo URL"
                    required
                  />

                  {/* Email  */}
                  <label className="label text-sm mt-6 text-white">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="input w-full rounded-lg"
                    placeholder="Email"
                    required
                  />

                  {/* Password  */}
                  <label className="label text-sm mt-6 text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="input w-full rounded-lg"
                      placeholder="Password"
                      required
                    />
                    <button
                      onClick={() => setshowPassword(!showPassword)}
                      className="btn btn-xs absolute top-3 right-3 text-2xl bg-white border-none"
                      type="button"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                  </div>
                  {passwordError && (
                    <p className="text-black text-sm">{passwordError}</p>
                  )}

                  <button
                    type="submit"
                    className="btn btn-neutral mt-4 text-lg rounded-lg"
                  >
                    Register
                  </button>

                  <div className="divider text-white text-lg">or</div>

                  <button className="flex items-center justify-center gap-2 cursor-pointer">
                    <FcGoogle size={24} /> <span className="text-lg text-white">Login with Google</span>
                  </button>

                  <p className="font-semibold text-center pt-8 text-xl text-white">
                    Already Have An Account?{" "}
                    <Link className="text-xl text-black" to="/login">
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
  );
}
