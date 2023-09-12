export type User =
  | {
      id: string;
      name: string;
      email: string;
      image?: string | null;
      role?: string | null;
    }
  | undefined;
