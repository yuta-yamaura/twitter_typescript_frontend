import { Flex, message, Modal } from "antd";
import { instance } from "../../../utils/client";
import { Button } from "../../atoms/Button/Button";
import { useState } from "react";

type UserDeleteModalModalProps = {
  isModalOpen: boolean;
  handleCancel: () => void;
  handleOk: () => void;
};

export const UserDeleteModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
}: UserDeleteModalModalProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const UserDelete = async () => {
    try {
      setIsLoading(true);
      await instance.delete(`/api/users/delete/`);
      setIsLoading(false);
      messageApi.success("ユーザーを削除しました");
    } catch (error) {
      messageApi.error("ユーザーの削除が失敗しました");
    } finally {
      handleOk();
    }
  };

  return (
    <Modal
      title="退会"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <Flex vertical style={{ width: "100%" }}>
        {contextHolder}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          <div>削除したアカウントは復元できません。</div>
          <div>アカウントを削除しますか？</div>
        </div>
        <Flex justify="end" gap="small" style={{ marginTop: "16px" }}>
          <Button onClick={handleCancel}>キャンセル</Button>
          <Button loading={isLoading} onClick={UserDelete} danger>
            アカウントを削除
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};
