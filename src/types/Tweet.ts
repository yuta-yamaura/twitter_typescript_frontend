import type { User } from "./User";

export type Tweet = {
  id: number;
  user: User;
  content: string;
  image?: string | null;
  createdAt: string;
  retweetCount?: number;
  likeCount?: number;
  loginUserRetweeted: boolean;
  loginUserLiked: boolean;
  loginUserBookmarked: boolean;
};
