import { hashPassword } from '../utils/password';

export interface User {
  userId: number;
  email: string;
  password: string;
  role: string;
}

const users: User[] = [];

export const createUser = async (email: string, password: string) => {
  if (users.find(user => user.email === email)) throw new Error('User already exists');
  const hashedPassword = await hashPassword(password);
  const user = { email, password: hashedPassword, userId: users.length + 1, role: 'user' };
  users.push(user);
  return user;
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
}
