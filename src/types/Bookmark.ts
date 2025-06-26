import type { User } from "./User";

export type Bookmark = Omit<User, "name" | "isAdmin" | "tweets"> & {
  id: number;
  user: User;
  bookmark: [
    {
      id: number;
      user: {
        image: string;
        accountName: string;
        username: string;
      };
      tweet: {
        content: string;
        image: string;
      };
      createdAt: string;
      retweetCount?: number;
      likeCount?: number;
      loginUserRetweeted: boolean;
      loginUserLiked: boolean;
    }
  ];
  createdAt: string;
};
