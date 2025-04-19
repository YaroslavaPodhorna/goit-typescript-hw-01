import LoginForm from "../../components/LoginForm/LoginForm";
import PageTitle from "../../components/PageTitle/PageTitle";
import css from "./LoginPage.module.css";
export default function LoginPage() {
  return (
    <div className={css.wrapper}>
      <PageTitle className={css.title}>Login</PageTitle>
      <p className={css.subtitle}>Login to your account</p>
      <LoginForm />
    </div>
  );
}
