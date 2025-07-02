import type { User } from "./User";

export type DirectMessage = {
  id: number;
  room: number;
  sender: User;
  content: string;
  createdAt: string;
};

export type MessageGroup = {
  id: number;
  room: number;
  user: User;
  content: string;
  createdAt: string;
};
