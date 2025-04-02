import LoginForm from "../_components/login-form";
import SocialLoginButtons from "../_components/social-login-buttons";

const LoginPage = () => {
  return (
    <div className="m-4 flex flex-col items-center justify-center">
      <h1 className="my-3 text-3xl">Hey, Time to sign In</h1>
      <LoginForm />
      <SocialLoginButtons />
    </div>
  );
};

export default LoginPage;
