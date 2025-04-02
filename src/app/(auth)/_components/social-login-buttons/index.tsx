import { doSocialLogin } from "@/action/auth";
import React from "react";

const SocialLoginButtons = () => {
  return (
    <form action={doSocialLogin}>
      <button
        type="submit"
        className="m-1 rounded-md bg-pink-400 p-1 text-lg text-white"
        name="action"
        value="google"
      >
        Sign In with Google
      </button>
    </form>
  );
};

export default SocialLoginButtons;
