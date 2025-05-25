import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const schema = z
    .object({
      username: z.string().min(3, "Username must be at least 3 characters"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords must match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password", "");
  const passwordRequirements = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };

  const onSubmit = (data) => {
    navigate("/login");
  };

  const handleFormSubmit = (data) => {
    setIsSubmitted(true);
    return handleSubmit(onSubmit)(data);
  };

  const togglePassword = (field) => {
    if (field === "password") setPasswordVisible((prev) => !prev);
    if (field === "confirmPassword") setConfirmPasswordVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bgYellow px-4">
      {/* Left side (Logos/Images) */}
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
          onSubmit={handleFormSubmit}
          className="bg-white p-8 sm:p-10 md:p-12 rounded-3xl shadow-md w-full max-w-md"
        >
          <div className="mb-4">
            <img src="..\src\assets\button\arrow_back.png" alt="Back" className="w-6" />
          </div>
          <p className="mt-4 font-bold text-center text-lg">Create an Account</p>

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
              onClick={() => togglePassword("password")}
              className="absolute right-3 top-3 text-sm"
            >
              {passwordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          {isSubmitted && errors.password && (
            <div className="mt-2">
              <div className="flex items-center">
                <span className={`${passwordRequirements.minLength ? "text-green-600" : "text-red-600"} mr-1`}>
                  {passwordRequirements.minLength ? "✓" : "✗"}
                </span>
                <span className="text-sm">Contain minimum 8 characters</span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`${passwordRequirements.hasUppercase ? "text-green-600" : "text-red-600"} mr-1`}>
                  {passwordRequirements.hasUppercase ? "✓" : "✗"}
                </span>
                <span className="text-sm">Include at least one uppercase letter (A-Z)</span>
              </div>
              <div className="flex items-center mt-1">
                <span className={`${passwordRequirements.hasNumber ? "text-green-600" : "text-red-600"} mr-1`}>
                  {passwordRequirements.hasNumber ? "✓" : "✗"}
                </span>
                <span className="text-sm">Include at least one number (0-9)</span>
              </div>
            </div>
          )}

          <label className="block font-semibold mt-4">Confirm Password</label>
          <div className="relative">
            <input
              {...register("confirmPassword")}
              type={confirmPasswordVisible ? "text" : "password"}
              className="bg-white w-full p-2 border rounded mt-1"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => togglePassword("confirmPassword")}
              className="absolute right-3 top-3 text-sm"
            >
              {confirmPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm flex items-center mt-1">
              <span className="mr-1">✗</span>
              {errors.confirmPassword.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-black hover:bg-gray-800 text-white p-2 mt-4 rounded font-bold border border-black"
          >
            Create Account
          </button>

          <p className="mt-4 text-center">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-black font-semibold hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
