export type Tweet = {
  id: number;
  username: string;
  account_name?: string;
  content: string;
  image?: string | null;
  user_image: string;
  created_at: string;
};
