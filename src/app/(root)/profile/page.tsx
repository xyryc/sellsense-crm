import LogoutButton from "@/app/(auth)/_components/logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Profile = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div>
      <h1>User Profile</h1>
      <h3>Email: {session?.user?.email}</h3>
      <LogoutButton />
    </div>
  );
};

export default Profile;
