import type { User } from "./User";

export type Comment = {
  id: number;
  user: User;
  tweet: number;
  content: string;
  image?: string | null;
  createdAt: string;
};

export interface ProfileComment extends User {
  comments: Comment[];
}
