import type { User } from "./User";

type Retweet = Omit<User, "name" | "isAdmin" | "tweets"> & {
  id: number;
  user: User;
  tweet: {
    content: string;
    image: string;
  };
  retweet: number;
  createdAt: string;
  retweetCount: number;
};

export type ProfileRetweet = {
  retweet: Retweet[];
};
