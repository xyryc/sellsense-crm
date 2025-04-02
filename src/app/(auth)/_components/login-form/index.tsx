"use client";

import useLoginHandler from "./hooks/useLoginHandler";

const LoginForm = () => {
  const { error, handleFormSubmit } = useLoginHandler();

  return (
    <>
      <div className="text-red-500 text-xl">{error}</div>
      <form className="space-y-4" onSubmit={handleFormSubmit}>
        <div className="flex-between my-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border rounded"
            placeholder="Enter your Email"
          />
        </div>
        <div className="flex-between my-2">
          <label htmlFor="password" className="block font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your Password"
          />
        </div>
        <button
          type="submit"
          className="w-full border bg-blue-100 text-blue-600 border-blue-200 font-bold p-2 rounded"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
