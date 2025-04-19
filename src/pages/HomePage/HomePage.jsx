import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Welcome to the Phonebook</h1>
      <p className={css.subtitle}>Your personal contact management system.</p>
      <p className={css.subtitle}>
        Manage your contacts easily and efficiently.
      </p>
    </div>
  );
}
