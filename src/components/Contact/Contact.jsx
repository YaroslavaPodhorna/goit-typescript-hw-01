import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { toast } from "react-hot-toast";
import css from "./Contact.module.css";

export default function Contact({ contact, onEdit }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .then(() => toast.success(`Successfully deleted ${contact.name}!`))
      .catch(() => toast.error("Error! This contact does not exist!"));
  };
  const handleEdit = () => {
    if (onEdit) {
      onEdit(contact);
    }
  };
  return (
    <div className={css.contact}>
      <div className={css.info}>
        <span className={css.name}>{contact.name}</span>
        <span className={css.number}>{contact.number}</span>
      </div>

      <div className={css.actions}>
        <button className={css.button} onClick={handleDelete}>
          Delete
        </button>
        <button className={css.button} onClick={handleEdit}>
          Edit
        </button>
      </div>
    </div>
  );
}
