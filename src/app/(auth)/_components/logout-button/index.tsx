import { doLogout } from "@/action/auth";
import React from "react";

const LogoutButton = () => {
  return (
    <form action={doLogout}>
      <button
        className="bg-blue-400 text-white p-1 rounded-md m-1 text-lg"
        type="submit"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
