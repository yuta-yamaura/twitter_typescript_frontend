import { Flex, message } from "antd";
import { Button } from "../../atoms/Button/Button";
import { InputField } from "../forms/InputField";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { authInstance, instance } from "../../../utils/client";
import { getAuthToken } from "../../../utils/auth";
import { Image } from "../../atoms/Icon/Image";
import { TweetSchema, type TweetForm } from "../../../schema/TweetSchema";
import { TweetsList } from "./TweetsList";
import { useEffect, useState } from "react";
import { Loading } from "../loading/Loading";
import type { User } from "../../../types/User";

export const Addtweet = () => {
  const token = getAuthToken();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const loginUser = async () => {
    const res = await authInstance.get(`api/users/info/`);
    setUser(res.data);
  };

  useEffect(() => {
    loginUser();
  }, []);

  const form = useForm<TweetForm>({
    defaultValues: {
      user: "",
      content: "",
      image: undefined,
    },
    resolver: zodResolver(TweetSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof TweetSchema>> = async (data) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("user", data.user);
      formData.append("content", data.content);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      await instance.post("/api/tweets/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      form.reset();
      setIsLoading(false);
      messageApi.success("ポストが完了しました");
    } catch (error) {
      messageApi.error("ポストが失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        encType="multipart/form-data"
      >
        <Flex vertical gap="middle" style={{ width: "100%" }}>
          {contextHolder}
          <Flex style={{ display: "flex" }}>
            <img
              src={user?.image}
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            <InputField
              placeholder="いまどうしてる？"
              name="content"
              type="text"
              register={form.register}
              style={{ border: "none", fontSize: "20px" }}
            />
          </Flex>
          <Flex justify="space-between">
            <InputField
              name="image"
              type="file"
              register={form.register}
              hidden
            >
              <Image width="24px" height="24px" />
            </InputField>
            <Button
              type="primary"
              htmlType="submit"
              style={{ borderRadius: "25px" }}
            >
              ポストする
            </Button>
          </Flex>
        </Flex>
      </form>
      {isLoading ? <Loading /> : <TweetsList />}
    </>
  );
};
