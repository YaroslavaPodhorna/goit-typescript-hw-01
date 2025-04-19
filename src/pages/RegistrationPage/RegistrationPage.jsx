import PageTitle from "../../components/PageTitle/PageTitle";

import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <div className={css.wrapper}>
      <PageTitle className={css.title}>Register</PageTitle>
      <p className={css.subtitle}>Create your account</p>
      <RegistrationForm />
    </div>
  );
}
