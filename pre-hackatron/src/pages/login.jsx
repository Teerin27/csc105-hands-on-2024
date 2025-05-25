import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const schema = z.object({
    username: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = (data) => {
    console.log("Login attempt with:", data);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bgYellow px-4">
      {/* Left side (Logo/Images) */}
      <div className="hidden lg:flex w-full lg:w-1/2 flex-col items-start justify-center pl-8 relative">
        <div className="absolute top-3 left-5 z-50">
          <img src="../LogoBid2.png" alt="Logo" className="w-9" />
        </div>
        <div className="absolute top-5 left-20 z-50">
          <img src="..\src\assets\logo\Find works.png" alt="Find works" className="w-52" />
        </div>
        <div className="absolute top-27 left-20 z-50">
          <img src="..\src\assets\background\sample01.png" alt="Sample work" className="w-180" />
        </div>
      </div>

      {/* Right side (Form) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center py-12">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-md w-full max-w-md"
        >
          <div className="mb-4">
            <img src="..\src\assets\button\arrow_back.png" alt="Back" className="w-6" />
          </div>

          <p className="mt-4 font-bold text-center text-lg">Log In to Your Account</p>

          <label className="block font-semibold mt-4">Email</label>
          <input
            {...register("username")}
            className="bg-white w-full p-2 border rounded mt-1"
            placeholder="Enter your Email"
          />
          {errors.username && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <span className="mr-1">✗</span>
              {errors.username.message}
            </p>
          )}

          <label className="block font-semibold mt-4">Password</label>
          <div className="relative">
            <input
              {...register("password")}
              type={passwordVisible ? "text" : "password"}
              className="bg-white w-full p-2 border rounded mt-1"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3"
            >
              👁️
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <span className="mr-1">✗</span>
              {errors.password.message}
            </p>
          )}

          <div className="flex justify-end mt-2">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-black text-sm hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            onClick={() => navigate("/login/main")}
            className="w-full bg-black hover:bg-gray-800 text-white p-2 mt-4 rounded font-bold border border-black"
          >
            Log In
          </button>

          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="text-black font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
