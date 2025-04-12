import LoginForm from "../_components/login-form";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col bg-white dark:bg-gray-800">
      <div className="max-w-md mx-auto w-full p-6">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
