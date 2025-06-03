import { Flex, message, Popover } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../../utils/client";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import type { User } from "../../../types/User";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { UserProfileUpdateModal } from "../modals/UserProfileUpdateModal";
import { Loading } from "../loading/Loading";
import { DashOutline } from "../../atoms/DashOutline";
import { getAuthToken } from "../../../utils/auth";

export const UserProfile = () => {
  const token = getAuthToken();
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 削除のpopover
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>({});

  const handleOpenChange = (tweetId: number, newOpen: boolean) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [tweetId]: newOpen,
    }));
  };

  const fetchUserProfile = async () => {
    try {
      const res = await instance.get<User>(`/api/users/profile/${id}/`);
      console.log(res);
      setUser(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTweet = async (id: number) => {
    try {
      setIsLoading(true);
      await instance.delete<User>(`/api/tweets/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      messageApi.success("ツイートを削除しました");
      // 最新のツイートを取得
      await fetchUserProfile();
    } catch (e) {
      messageApi.error("ツイートの削除に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [loading]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
    fetchUserProfile();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Baselayout>
        {contextHolder}
        {isLoading ? (
          <Loading />
        ) : (
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
                <Button type="text" onClick={showModal}>
                  プロフィールを編集
                </Button>
                {user && (
                  <UserProfileUpdateModal
                    user={user}
                    loading={loading}
                    isModalOpen={isModalOpen}
                    handleOk={handleOk}
                    handleCancel={handleCancel}
                  />
                )}
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
              <div
                key={tweet.id}
                style={{
                  border: "solid 1px",
                  borderColor: "#f5f5f5",
                  width: "100%",
                  maxWidth: "600px",
                  margin: "0 auto",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                  }}
                >
                  <div>
                    <div key={tweet.id} style={{ paddingLeft: "8px" }}>
                      <div
                        style={{
                          display: "flex",
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
                              marginRight: "8px",
                            }}
                          />
                        </Link>

                        <div style={{ width: "100%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div>
                              <strong>
                                {user?.accountName && user.accountName}
                              </strong>
                              <span> @{user?.username && user.username}</span>
                              <span>
                                {" "}
                                {user?.createdAt &&
                                  dayjs(user.createdAt).format("YYYY年M月D日")}
                              </span>
                            </div>
                            <Popover
                              content={
                                <div
                                  onClick={() => deleteTweet(tweet.id)}
                                  style={{ cursor: "pointer" }}
                                >
                                  削除
                                </div>
                              }
                              trigger="click"
                              open={openPopovers[tweet.id]}
                              onOpenChange={(newOpen) =>
                                handleOpenChange(tweet.id, newOpen)
                              }
                            >
                              <Button type="text" style={{ padding: 0 }}>
                                <DashOutline
                                  width="24px"
                                  height="24px"
                                  style={{ justifyContent: "end" }}
                                />
                              </Button>
                            </Popover>
                          </div>
                          <Link
                            to={`/tweet/${tweet.id}`}
                            style={{ textDecoration: "None", color: "inherit" }}
                          >
                            <div key={tweet.id}>
                              <Flex>{tweet.content}</Flex>
                              {tweet.tweetImage && (
                                <Flex
                                  style={{
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
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Baselayout>
    </>
  );
};
