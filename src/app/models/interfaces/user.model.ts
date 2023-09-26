export interface User {
  id: number;
  email: string;
  role: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {}
