import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Jamie S',
    email: 'jamie@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jeesoo S',
    email: 'jeesoo@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
