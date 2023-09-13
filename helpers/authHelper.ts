export type UserRole = 'root' | 'admin' | 'user';
export type User =
  | {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: UserRole | null;
      createdAt?: string;
    }
  | undefined;

export const isUserRoot = (user: User) => user?.role === 'root';
export const isUserAdmin = (user: User) => user?.role === 'root' || user?.role === 'admin';
