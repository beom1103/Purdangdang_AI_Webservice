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

export type Info = {
  description: string;
  id: number;
  image_url: string;
  kor: string;
  name: string;
  rank: number;
  shopping_url: null;
  sunlight: string;
  temperature: string;
  water_cycle: string;
};

export type Reviews = {
  content: string;
  created_at: string;
  id: number;
  plant_id: number;
  plantname: string;
  score: number;
  updated_at: string;
  username: string;
};
