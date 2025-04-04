import LoginForm from "../_components/login-form";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <h1 className="text-5xl font-bold text-center">Please Login</h1>
      <div className="max-w-md mx-auto w-full p-6 bg-white rounded-lg shadow-md border mt-12 ">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
