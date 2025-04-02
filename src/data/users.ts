type User = {
  email: string;
  password: string;
};

const users: User[] = [
  {
    email: "fai@example.com",
    password: "pass123",
  },
  {
    email: process.env.ADMIN_EMAIL as string,
    password: process.env.ADMIN_PASSWORD as string,
  },
];

export const getUserByEmail = (email: string) => {
  const found = users.find((user) => user.email === email);
  return found;
};
