import { AuthenticatedUser } from '../interfaces/http/types/authenticated-user';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}
