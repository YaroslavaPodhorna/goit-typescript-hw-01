import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => toast.success("Login successful!"))
      .catch(() => toast.error("Login failed. Check your credentials."));

    actions.resetForm();
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label className={css.label} htmlFor="email">
            Email
            <Field
              type="email"
              name="email"
              id="email"
              className={css.input}
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label} htmlFor="password">
            Password
            <Field
              type="password"
              name="password"
              id="password"
              className={css.input}
              placeholder="Enter your password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>

          <button type="submit" className={css.button}>
            Login
          </button>
        </Form>
      </Formik>
    </>
  );
}
