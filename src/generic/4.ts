type User = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export function createOrUpdateUser(initialValues: Partial<User>) {
  // Оновлення користувача
  console.log("Updating user with values:", initialValues);
}

createOrUpdateUser({
  email: "user@mail.com",
  password: "password123",
});
