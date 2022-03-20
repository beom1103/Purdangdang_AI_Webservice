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
  username: string;
};

export type Search = {
  count?: number;
  next?: string;
  previous?: string;
  results: Plant[];
};

export type Plant = {
  id: number;
  kor: string;
  name: string;
  rank: number;
  image_url: string;
};

export type Info = {
  description?: string;
  id?: number;
  image_url?: string;
  kor?: string;
  name?: string;
  rank?: number;
  shopping_url?: null;
  sunlight?: string;
  temperature?: string;
  water_cycle?: string;
};

export type ReviewObj = {
  count?: number;
  next?: string;
  previous?: string;
  results?: Reviews[];
};

export type Reviews = {
  content: string;
  created_at?: string;
  id?: number;
  plant_id?: number;
  plantname?: string;
  score: number;
  updated_at?: string;
  username?: string;
};

export type Question = {
  id?: number;
  question: string;
  answer1: string;
  answer2: string;
  image: string;
};

export type Answer = {
  answers: string;
};

export type UserPlantList = {
  id: number;
  name: string;
  image: string;
  order: number;
  user_id: number;
};

export type PlantDisease = {
  id?: number;
  cause?: string;
  image_url?: string;
  name?: string;
  precaution?: string;
  symptom?: string;
};

export type PlantDataType = {
  top1?: {
    detail: Info;
    percent: string;
  };
  top2?: {
    detail: Info;
    percent: string;
  };
  top3?: {
    detail: Info;
    percent: string;
  };
};
