"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";

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
    console.log("Login Data:", data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 mt-24 text-center">
        Please Login
      </h2>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
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
        <h1 className="mt-4  text-slate-500 text-base">
          Don't have an account?{" "}
          <Link href='/register' className="text-green-500 font-medium">Create an Account</Link>
        </h1>
      </div>
    </div>
  );
};

export default LoginPage;
