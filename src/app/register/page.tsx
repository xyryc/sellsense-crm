"use client";

import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  photoURL: string;
};

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
  };

  return (
    <div>
      <h2 className="text-5xl font-bold mb-4 text-center mt-24">
        Please Register
      </h2>
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block font-medium">Photo URL</label>
            <input
              {...register("photoURL", { required: "Photo URL is required" })}
              className="w-full p-2 border rounded"
              placeholder="Enter your photoURL"
            />
            {errors.photoURL && (
              <p className="text-red-500">{errors.photoURL.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full border bg-blue-100 text-blue-600 border-blue-200 font-bold p-2 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
