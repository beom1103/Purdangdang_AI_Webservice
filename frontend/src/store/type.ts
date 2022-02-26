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

export type Plant = {
  kor: string;
  name: string;
  rank: number;
  image_url: string;
};
