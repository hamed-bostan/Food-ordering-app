export type UserRole = "user" | "admin";

export type BaseUser = {
  id: string;
  phoneNumber: string;
  role: UserRole;
};

export type User = BaseUser & {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string | null;
};
