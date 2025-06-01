import { Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../../utils/client";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import type { User } from "../../../types/User";
import { Link } from "react-router-dom";

export const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchUserProfile = async () => {
    try {
      const res = await instance.get<User>(`/api/users/profile/${id}/`);
      console.log(res);
      setUser(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <>
      <Baselayout>
        {contextHolder}
        <div
          key={id}
          style={{
            border: "solid 1px",
            borderColor: "#f5f5f5",
          }}
        >
          <div style={{ position: "relative" }}>
            <img
              src={
                user?.backgroundImage
                  ? user.backgroundImage
                  : "../../../public/DSC_0022.JPG"
              }
              style={{
                width: "100%",
                height: "200px",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "-65px",
                left: "16px",
              }}
            >
              <img
                src={user?.image ? user.image : "../../../人物アイコン.png"}
                style={{
                  width: "133px",
                  height: "133px",
                  borderRadius: "50%",
                  border: "4px solid white",
                  backgroundColor: "bisque",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              プロフィールを編集
            </div>
          </div>
          <div style={{ paddingLeft: "8px", marginTop: "80px" }}>
            <Flex style={{ fontWeight: "bold" }}>
              {user?.accountName && user.accountName}
            </Flex>
            <Flex> @{user?.username && user.username}</Flex>
            <Flex
              style={{
                alignItems: "center",
              }}
            >
              <Flex>{user?.selfIntroduction && user.selfIntroduction}</Flex>
            </Flex>
            <Flex>
              {user?.createdAt &&
                dayjs(user.createdAt).format("YYYY年M月DD日 HH:mm")}
            </Flex>
          </div>

          {user?.tweets?.map((tweet) => (
            <Flex
              key={tweet.id}
              style={{
                border: "solid 1px",
                borderColor: "#f5f5f5",
              }}
            >
              <Flex
                style={{
                  display: "flex",
                  paddingTop: "12px",
                  paddingLeft: "16px",
                  paddingBottom: "12px",
                }}
              >
                <Link
                  to={`/user/${tweet.user.id}`}
                  style={{ textDecoration: "None", color: "inherit" }}
                >
                  <img
                    src={
                      tweet.user.image
                        ? tweet.user.image
                        : "../../../人物アイコン.png"
                    }
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                </Link>
                <div key={tweet.id} style={{ paddingLeft: "8px" }}>
                  <Link
                    to={`/tweet/${user?.id}`}
                    style={{ textDecoration: "None", color: "inherit" }}
                  >
                    <strong>{user?.accountName && user.accountName}</strong>
                    <span> @{user?.username && user.username}</span>
                    <span>
                      {" "}
                      {user?.createdAt &&
                        dayjs(user.createdAt).format("YYYY年M月D日")}
                    </span>
                    <Flex>{tweet.content}</Flex>
                    {tweet.tweetImage && (
                      <Flex
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={tweet.tweetImage}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            borderRadius: "20px",
                          }}
                        />
                      </Flex>
                    )}
                  </Link>
                </div>
              </Flex>
            </Flex>
          ))}
        </div>
      </Baselayout>
    </>
  );
};
