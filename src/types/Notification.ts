import type { User } from "./User";

export type Notification = {
  id: number;
  notificationType: "LK" | "FL" | "CM" | "RT";
  recipient: string;
  sender: User;
  message: string;
  isRead: boolean;
  createdAt: string;
};
