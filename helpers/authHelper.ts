export type UserRole = 'root' | 'admin' | 'user';
export type UserHobby = 'drone' | 'car' | 'airplane';

export type User =
  | {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: UserRole | null;
      hobby?: UserHobby | null;
      instagram?: string;
      telegram?: string;
      createdAt?: string;
      isDeleted?: boolean;
    }
  | undefined;

export const isUserRoot = (user: User) => user?.role === 'root';
export const isUserAdmin = (user: User) => user?.role === 'root' || user?.role === 'admin';
