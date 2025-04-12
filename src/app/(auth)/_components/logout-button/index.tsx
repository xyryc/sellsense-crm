import { doLogout } from "@/action/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const LogoutButton = () => {
  return (
    <form action={doLogout}>
      <Button variant={"destructive"}>Logout</Button>
    </form>
  );
};

export default LogoutButton;
