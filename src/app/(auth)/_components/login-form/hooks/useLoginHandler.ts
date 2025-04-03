import { doCredentialsLogin } from "@/action/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useLoginHandler = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);

      const response = await doCredentialsLogin(formData);

      if (!!response.error) {
        setError(response.error.message);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError("Check your credentials and try again.");
    }
  };
  return { handleFormSubmit, error };
};

export default useLoginHandler;
