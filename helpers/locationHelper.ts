export type UserHobby = 'drone' | 'car' | 'airplane';

export type LocationType = {
  id?: string;
  title?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  hobby?: UserHobby;
  userId?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    instagram: string;
    telegram: string;
  };
  createdAt?: string;
  isDeleted?: boolean;
};
