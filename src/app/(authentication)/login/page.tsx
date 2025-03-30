"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    const { email, password } = data!;
    if (!email || !password) return alert("Invalid Credentials");

    if (
      email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL ||
      password !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    )
      return alert("Wrong Credentials Please enter a valid Email or Password");

    signIn("credentials", {
      callbackUrl: `${window.location.origin}/`,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen flex-col ">
      <h2 className="text-5xl font-bold text-center">Please Login</h2>
      <div className="max-w-md mx-auto w-full p-6 bg-white rounded-lg shadow-md border mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your Password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border bg-blue-100 text-blue-600 border-blue-200 font-bold p-2 rounded"
          >
            Login
          </button>
        </form>

        <div className="border-b-2 mt-8"></div>
        <h1 className="font-bold mt-8 text-center text-slate-500">
          Login Using
        </h1>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: `${window.location.origin}/dashboard`,
            })
          }
          className="text-3xl ml-[190px] mt-2"
        >
          <FcGoogle />
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
