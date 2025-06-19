import type { Tweet } from "./Tweet";

export type User = {
  id: number;
  name: string;
  accountName: string;
  image: string;
  backgroundImage: string;
  username: string;
  email: string;
  selfIntroduction: string;
  dateOfBirth: string;
  address: string;
  webSite: string;
  isAdmin: boolean;
  createdAt: string;
  loginUser: boolean;
  tweets?: Tweet[];
};
