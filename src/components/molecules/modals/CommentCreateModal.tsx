import { Flex, message, Modal } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authInstance } from "../../../utils/client";
import { InputField } from "../forms/InputField";
import type { z } from "zod";
import { Button } from "../../atoms/Button/Button";
import { CommentSchema, type CommentForm } from "../../../schema/CommentSchema";
import type { Tweet } from "../../../types/Tweet";

type CommentCreateModalProps = {
  tweet: Tweet;
  loading: boolean;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export const CommentCreateModal = ({
  tweet,
  loading,
  isModalOpen,
  handleOk,
  handleCancel,
}: CommentCreateModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const form = useForm<CommentForm>({
    defaultValues: {
      comment: "",
      image: undefined,
    },
    resolver: zodResolver(CommentSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof CommentSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      formData.append("comment", data.comment);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await authInstance.post(`/api/tweets/${tweet.id}/comments/`, formData);
      form.reset();
      messageApi.success("コメントの送信が完了しました");
      handleOk();
    } catch (error) {
      messageApi.error("コメントの送信が失敗しました");
    }
  };

  return (
    <Modal
      title="返信をポスト"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Flex vertical style={{ width: "100%" }}>
          {contextHolder}
          <div>画像</div>
          <InputField name="image" type="file" register={form.register} />
          <div>コメント</div>
          <InputField name="comment" type="text" register={form.register} />
          <Flex justify="end" gap="small" style={{ marginTop: "16px" }}>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleOk}
            >
              返信
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};
