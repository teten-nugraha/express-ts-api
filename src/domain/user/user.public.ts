import { Role } from './user.entity';

export interface CreateUserProps {
  email: string;
  password: string;
  name: string;
  role?: Role;
}
