import type { DirectMessage } from "../types/DirectMessage";

export const useSentMessage = (
  content: string,
  username: string,
  room: number = 0
): DirectMessage => ({
  id: 0,
  room,
  sender: {
    id: 0,
    name: username,
    accountName: username,
    image: "",
    backgroundImage: "",
    username,
    email: "",
    selfIntroduction: "",
    dateOfBirth: "",
    address: "",
    webSite: "",
    isAdmin: false,
    createdAt: "",
    loginUser: false,
    following: false,
  },
  content,
  createdAt: new Date().toISOString(),
});
