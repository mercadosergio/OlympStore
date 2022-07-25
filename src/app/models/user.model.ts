export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  rol?: string;
}

export interface CreateUserDTO extends Omit<User, 'id'> {

}