import { Flex, message, Space } from "antd";
import { XLogoView } from "../../atoms/XLogoView";
import { InputField } from "../../molecules/forms/InputField";
import { Button } from "../../atoms/Button/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { instance } from "../../../utils/client";
import { setAuthToken } from "../../../utils/auth";
import {
  LoginSchema,
  type LoginForm,
} from "../../../schema/AuthorizationSchema";
import type { z } from "zod";
import { useNavigate } from "react-router-dom";

export const LoginPageView = ({}) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const form = useForm<LoginForm>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof LoginSchema>> = async (data) => {
    try {
      const response = await instance.post("/api/users/login/", data);
      setAuthToken({ token: response.data.access });
      messageApi.success("ログインが完了しました");
      navigate("/");
    } catch (error) {
      messageApi.error("ログインに失敗しました");
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
                name="password"
                placeholder="password"
                type="password"
                register={form.register}
              />
              <Button htmlType="submit">ログイン</Button>
            </Flex>
          </form>
        </Space>
      </Space>
    </>
  );
};
