import type { Tweet } from "./Tweet";

export type User = {
  id: number;
  name: string;
  accountName: string;
  image: string;
  backgroundImage: string;
  username: string;
  email: string;
  user_image: string;
  selfIntroduction: string;
  isAdmin: boolean;
  createdAt: string;
  tweets?: Tweet[];
};
