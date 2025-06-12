import { Flex, message, Modal } from "antd";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authInstance } from "../../../utils/client";
import { InputField } from "../forms/InputField";
import {
  UserProfileSchema,
  type UserProfileForm,
} from "../../../schema/UserProfileSchema";
import type { z } from "zod";
import { useParams } from "react-router-dom";
import type { User } from "../../../types/User";
import { Button } from "../../atoms/Button/Button";
import { useEffect } from "react";

type UserProfileUpdateModalProps = {
  user: User;
  isLoading: boolean;
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

export const UserProfileUpdateModal = ({
  user,
  isLoading,
  isModalOpen,
  handleOk,
  handleCancel,
}: UserProfileUpdateModalProps) => {
  const { id } = useParams();
  const [messageApi, contextHolder] = message.useMessage();

  const form = useForm<UserProfileForm>({
    defaultValues: {
      accountName: user.accountName,
      selfIntroduction: user.selfIntroduction,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      webSite: user.webSite,
      backgroundImage: undefined,
      image: undefined,
    },
    resolver: zodResolver(UserProfileSchema),
  });

  useEffect(() => {
    form.reset({
      accountName: user.accountName,
      selfIntroduction: user.selfIntroduction,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      webSite: user.webSite,
      backgroundImage: undefined,
      image: undefined,
    });
  }, [user, form]);

  const onSubmit: SubmitHandler<z.infer<typeof UserProfileSchema>> = async (
    data
  ) => {
    try {
      const formData = new FormData();
      formData.append("account_name", data.accountName);
      formData.append("self_introduction", data.selfIntroduction);
      formData.append("address", data.address);
      formData.append("date_of_birth", data.dateOfBirth);
      formData.append("web_site", data.webSite);
      if (data.backgroundImage && data.backgroundImage.length > 0) {
        formData.append("background_image", data.backgroundImage[0]);
      }
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await authInstance.patch(`/api/users/profile/${id}/`, formData);
      form.reset();
      messageApi.success("プロフィールの更新が完了しました");
      handleOk();
    } catch (error) {
      messageApi.error("プロフィールの更新が失敗しました");
    }
  };

  return (
    <Modal
      title="プロフィール編集"
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
          <div>背景画像</div>
          <InputField
            name="backgroundImage"
            type="file"
            register={form.register}
          />
          <div>アカウント画像</div>
          <InputField name="image" type="file" register={form.register} />
          <div>アカウント名</div>
          <InputField name="accountName" type="text" register={form.register} />
          <div>自己紹介</div>
          <InputField
            name="selfIntroduction"
            type="text"
            register={form.register}
          />
          <div>住所</div>
          <InputField name="address" type="text" register={form.register} />
          <div>誕生日</div>
          <InputField name="dateOfBirth" type="text" register={form.register} />
          <div>Webサイト</div>
          <InputField name="webSite" type="text" register={form.register} />
          <Flex justify="end" gap="small" style={{ marginTop: "16px" }}>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              onClick={handleOk}
            >
              更新
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};
