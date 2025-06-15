import { authInstance } from "./client";
import type { User } from "../types/User";
import type { Dispatch, SetStateAction } from "react";
import type { MessageInstance } from "antd/es/message/interface";

type CommentDeleteProps = {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
  messageApi: MessageInstance;
};

export const useCommentDelete = ({
  setIsLoading,
  onSuccess,
  messageApi,
}: CommentDeleteProps) => {
  const deleteComment = async (id: number) => {
    try {
      setIsLoading(true);
      await authInstance.delete<User>(`/api/comments/${id}/`);
      messageApi.success("コメントを削除しました");
      onSuccess?.();
    } catch (e) {
      messageApi.error("別アカウントのコメントは削除できません");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteComment };
};
