import type { User } from "./User";

type Like = Omit<User, "name" | "isAdmin" | "tweets"> & {
  id: number;
  user: User;
  tweet: {
    content: string;
    image: string;
  };
  createdAt: string;
  retweetCount: number;
  likeCount: number;
};

export type ProfileLike = {
  like: Like[];
};
