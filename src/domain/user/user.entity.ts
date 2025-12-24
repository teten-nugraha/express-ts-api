export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: Date;
  updatedAt: Date;
}
