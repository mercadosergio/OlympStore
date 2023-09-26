import { User } from './user.model';

export interface Customer {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  user: User;
}
