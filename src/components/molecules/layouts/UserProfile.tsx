import { Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { authInstance } from "../../../utils/client";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import type { User } from "../../../types/User";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { UserProfileUpdateModal } from "../modals/UserProfileUpdateModal";
import { Loading } from "../loading/Loading";
import { ProfilePostList } from "./ProfilePostList";
import { useTweetDelete } from "../../../utils/useTweetDelete";

export const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { deleteTweet, contextHolder: tweetDeleteContextHolder } =
    useTweetDelete({
      setIsLoading,
      onSuccess: () => fetchUserProfile(),
    });

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
      const res = await authInstance.get<User>(`/api/users/profile/${id}/`);
      setUser(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
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
        {tweetDeleteContextHolder}
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
                  src={
                    user?.image
                      ? user.image
                      : "../../../defaultAccountImage.png"
                  }
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

            <div>
              <Link
                to={`/user/${id}`}
                style={{ textDecoration: "None", color: "inherit" }}
              >
                ポスト
                <ProfilePostList
                  user={user}
                  deleteTweet={deleteTweet}
                  openPopovers={openPopovers}
                  handleOpenChange={handleOpenChange}
                />
              </Link>
            </div>
          </div>
        )}
      </Baselayout>
    </>
  );
};
