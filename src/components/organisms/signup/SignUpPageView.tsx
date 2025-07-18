import { Flex, message, Space } from "antd";
import { setAuthToken } from "../../../utils/auth";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { instance } from "../../../utils/client";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  SignUpSchema,
  type SignUpForm,
} from "../../../schema/AuthorizationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "../../molecules/forms/InputField";
import type { z } from "zod";
import { Button } from "../../atoms/Button/Button";
import "@ant-design/v5-patch-for-react-19";

export const SignUpPageView = ({}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const form = useForm<SignUpForm>({
    defaultValues: {
      username: "",
      email: "",
      telephoneNumber: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (
    data
  ) => {
    try {
      const response = await instance.post("/api/users/register/", data);
      setAuthToken({ token: response.data });
      messageApi.success("登録が完了しました");
      window.location.href = "/login";
    } catch (error) {
      console.error("登録ERROR:", error);
      messageApi.error("ユーザーの作成に失敗しました");
    }
  };

  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Space
          style={{
            width: 448,
            padding: "20px",
            zIndex: 1,
            boxShadow: "0 0.5mm 0.5mm rgba(0, 0, 0, 0.3)",
            borderRadius: 6,
          }}
          direction="vertical"
          size={24}
        >
          <Flex
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <XLogoView width="80px" height="80px" />
          </Flex>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Flex vertical gap="middle" style={{ width: "100%" }}>
              {contextHolder}
              <InputField
                placeholder="user name"
                name="username"
                type="text"
                register={form.register}
              />

              <InputField
                placeholder="test@gmail.com"
                name="email"
                type="email"
                register={form.register}
              />

              <InputField
                placeholder="080-1234-5678"
                name="telephoneNumber"
                type="text"
                register={form.register}
              />
              <InputField
                name="password"
                placeholder="password"
                type="password"
                register={form.register}
              />
              <Button htmlType="submit">サインアップ</Button>
            </Flex>
          </form>
        </Space>
      </Space>
    </>
  );
};
