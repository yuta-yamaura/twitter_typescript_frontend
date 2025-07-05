import type { User } from "./User";

export type Bookmark = Omit<User, "name" | "isAdmin" | "tweets"> & {
  user: User;
  id: number;
  content: string;
  image: string;
  retweetCount?: number;
  likeCount?: number;
  loginUserRetweeted: boolean;
  loginUserLiked: boolean;
  createdAt: string;
};
