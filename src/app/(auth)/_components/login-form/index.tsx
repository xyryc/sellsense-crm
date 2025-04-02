"use client";

import useLoginHandler from "./hooks/useLoginHandler";

const LoginForm = () => {
  const { error, handleFormSubmit } = useLoginHandler();

  return (
    <>
      <div className="text-red-500 text-xl">{error}</div>
      <form
        className="my-5 flex flex-col items-center rounded-md border border-gray-200 p-4"
        onSubmit={handleFormSubmit}
      >
        <div className="flex-between my-2">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="mx-2 rounded-md border border-gray-500"
          />
        </div>
        <div className="flex-between my-2">
          <label htmlFor="password">Password Address</label>
          <input
            type="password"
            id="password"
            name="password"
            className="mx-2 rounded-md border border-gray-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 flex w-36 items-center justify-center rounded-md bg-orange-300"
        >
          Credential Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
