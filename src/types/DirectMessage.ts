import type { User } from "./User";

export type DirectMessage = {
  id: number;
  sender: User;
  recipient: User;
  content: string;
  createdAt: string;
};

export type MessageGroup = {
  id: number;
  sender: User;
  recipient: User;
  content: string;
  createdAt: string;
};
