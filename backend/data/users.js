import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "Chris Fang",
    email: "chris@email.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
  {
    name: "Raj Buyya",
    email: "raj@email.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: false,
  },
];

export default users;
