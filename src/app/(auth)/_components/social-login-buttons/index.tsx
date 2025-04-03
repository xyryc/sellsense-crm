import { doSocialLogin } from "@/action/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const SocialLoginButtons = () => {
  return (
    <>
      <h1 className="font-bold text-center mt-4 text-slate-500">
        Or, Login Using
      </h1>
      <form action={doSocialLogin}>
        <button
          type="submit"
          name="action"
          value="google"
          className="text-3xl ml-[190px] mt-2"
        >
          <FcGoogle />
        </button>
      </form>
    </>
  );
};

export default SocialLoginButtons;
