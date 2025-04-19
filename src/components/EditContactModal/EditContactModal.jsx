import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().min(3).max(50).required("Name is required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Format: 123-45-67")
    .required("Phone number is required"),
});

export default function EditContactModal({ open, onClose, contact, onSubmit }) {
  if (!contact) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <Formik
        initialValues={{ name: contact.name, number: contact.number }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit({ ...values, id: contact.id });
          onClose();
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent>
              <Field
                as={TextField}
                fullWidth
                name="name"
                label="Name"
                margin="normal"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Field
                as={TextField}
                fullWidth
                name="number"
                label="Phone number"
                margin="normal"
                error={touched.number && !!errors.number}
                helperText={touched.number && errors.number}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
}
