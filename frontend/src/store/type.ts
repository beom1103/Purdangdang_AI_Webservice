export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  id: number;
  email: string;
};
