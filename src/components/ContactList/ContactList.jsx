import Contact from "../Contact/Contact";
import { useSelector, useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import css from "./ContactList.module.css";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import { deleteContact } from "../../redux/contacts/operations";
import EditContactModal from "../EditContactModal/EditContactModal";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactList() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectFilteredContacts);

  //   return (
  //     <>
  //       <ul className={css.list}>
  //         {contacts.map((contact) => (
  //           <li key={contact.id} className={css.iteam}>
  //             <Contact
  //               key={contact.id}
  //               contact={contact}
  //               onDelete={() => dispatch(deleteContact(contact.id))}
  //             />
  //           </li>
  //         ))}
  //       </ul>
  //     </>
  //   );
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleEdit = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleSubmit = (updatedContact) => {
    dispatch(updateContact(updatedContact))
      .unwrap()
      .then(() => {
        toast.success("Contact updated successfully");
        handleCloseModal();
      });
  };

  return (
    <>
      <ul className={css.list}>
        {contacts.map((contact) => (
          <li key={contact.id} className={css.iteam}>
            <Contact contact={contact} onEdit={handleEdit} />
          </li>
        ))}
      </ul>

      <EditContactModal
        open={isModalOpen}
        onClose={handleCloseModal}
        contact={selectedContact}
        onSubmit={handleSubmit}
      />
    </>
  );
}
