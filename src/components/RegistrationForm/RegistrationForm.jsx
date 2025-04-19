import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { register } from "../../redux/auth/operations";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log("Submitted values:", values);
    dispatch(register(values))
      .unwrap()
      .then(() => toast.success("User successfully registered!"))
      .catch(() => toast.error("Error! This email is already in use!"));

    actions.resetForm();
  };
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form autoComplete="off" className={css.form}>
          <label htmlFor="name">
            Username
            <Field
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              required
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label htmlFor="email">
            Email
            <Field
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              required
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label htmlFor="password">
            Password
            <Field
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              required
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </>
  );
}
