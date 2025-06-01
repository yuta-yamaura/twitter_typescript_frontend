import type { User } from "./User";

export type Tweet = {
  id: number;
  user: User;
  content: string;
  tweetImage?: string | null;
  createdAt: string;
};
