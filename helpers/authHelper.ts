export type User =
  | {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: string | null;
    }
  | undefined;

export const isUserRoot = (user: User) => user?.role === 'root';
export const isUserAdmin = (user: User) => user?.role === 'root' || user?.role === 'admin';
