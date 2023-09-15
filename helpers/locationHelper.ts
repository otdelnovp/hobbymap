export type UserHobby = 'drone' | 'car' | 'airplane';

export type LocationType = {
  id?: string;
  title?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  hobby?: UserHobby;
  userId?: string;
  createdAt?: string;
  isDeleted?: boolean;
};
