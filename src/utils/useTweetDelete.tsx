import { authInstance } from "./client";
import type { User } from "../types/User";
import type { Dispatch, SetStateAction } from "react";
import type { MessageInstance } from "antd/es/message/interface";

type TweetDeleteProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
  messageApi: MessageInstance;
};

export const useTweetDelete = ({
  setIsLoading,
  onSuccess,
  messageApi,
}: TweetDeleteProps) => {
  const deleteTweet = async (id: number) => {
    try {
      setIsLoading(true);
      await authInstance.delete<User>(`/api/tweets/${id}/`);
      messageApi.success("ツイートを削除しました");
      onSuccess?.();
    } catch (e) {
      messageApi.error("別アカウントのTweetは削除できません");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTweet };
};
