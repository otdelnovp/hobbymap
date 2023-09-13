export type UserRole = 'root' | 'admin' | 'user';
export type UserHobby = 'drone' | 'car';
export const hobbyTypes = [
  { name: 'FPV drone', value: 'drone' },
  { name: 'RC car', value: 'car' },
];

export type User =
  | {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: UserRole | null;
      hobby?: UserHobby | null;
      createdAt?: string;
    }
  | undefined;

export const isUserRoot = (user: User) => user?.role === 'root';
export const isUserAdmin = (user: User) => user?.role === 'root' || user?.role === 'admin';
