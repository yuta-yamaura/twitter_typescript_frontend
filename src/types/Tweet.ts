import type { User } from "./User";

export type Tweet = {
  id: number;
  user: User;
  content: string;
  image?: string | null;
  createdAt: string;
  retweetCount?: number;
};
