import LogoutButton from "@/app/(auth)/_components/logout-button";
import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import UserIcon from "@/assets/user.jpg"

const Profile = async () => {
  const session = await auth();

  if (!session?.user) redirect("/login");

  return (
    <div className="flex justify-center items-center flex-col gap-4 h-full">
      <Image
        src={UserIcon}
        alt="Admin Profile Picture"
        width={100}
        height={100}
        className="rounded-full border-4 border-cyan-500 cursor-pointer"
      />
      <h1 className="text-2xl font-bold">Welcome Back!</h1>
      <h3 className="text-gray-600">Email: {session?.user?.email}</h3>
      <LogoutButton />
    </div>
  );
};

export default Profile;
