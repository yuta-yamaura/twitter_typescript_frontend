import { Flex, message, Space } from "antd";
import { setAuthToken } from "../../../utils/auth";
import { XLogoView } from "../../atoms/XLogoView";
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

export const SignUpPageView = ({}) => {
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
    console.log("登録処理開始", data);
    try {
      const response = await instance.post("/api/users/register/", data);
      setAuthToken(response.data);
      message.success("登録が完了しました");
    } catch (error) {
      console.error("登録ERROR:", error);
      message.error("ユーザーの作成に失敗しました");
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
              name="telephone_number"
              type="text"
              register={form.register}
            />
            <InputField
              name="password"
              placeholder="password"
              type="password"
              register={form.register}
            />
            <Button
              type="submit"
              onClick={() => {
                console.log("ボタンクリック");
              }}
            >
              サインアップ
            </Button>
          </form>
        </Space>
      </Space>
    </>
  );
};
