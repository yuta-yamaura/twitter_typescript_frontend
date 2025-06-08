import { authInstance } from "./client";
import type { User } from "../types/User";
import { message } from "antd";
import type { Dispatch, SetStateAction } from "react";

type TweetDeleteProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
};

export const useTweetDelete = ({
  setIsLoading,
  onSuccess,
}: TweetDeleteProps) => {
  const [messageApi, contextHolder] = message.useMessage();

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

  return { deleteTweet, contextHolder };
};
