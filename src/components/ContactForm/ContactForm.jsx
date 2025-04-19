import { Formik, Form, Field, ErrorMessage } from "formik";
import * as contactsOperations from "../../redux/contacts/operations";
import * as Yup from "yup";
import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import css from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 123-45-67")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(addContact(values))
      .unwrap()
      .then(() => toast.success(`Successfully added ${values.name}!`))
      .catch(() => toast.error("Error! This contact already exists!"));
    actions.resetForm();
  };

  return (
    <div>
      <Formik
        initialValues={{ name: "", number: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label>
            Name:
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>
          <label>
            Number:
            <Field type="text" name="number" />
            <ErrorMessage name="number" component="div" className={css.error} />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </div>
  );
}
