import { Flex, message } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
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
import { ProfileCommentList } from "./ProfileCommentList";
import { ProfileLikesList } from "./ProfileLikesList";
import { ProfileRetweetsList } from "./ProfileRetweetsList";
import type { ProfileComment } from "../../../types/Comment";
import { useCommentDelete } from "../../../utils/useCommentDelete";
import type { ProfileRetweet } from "../../../types/Retweet";
import type { ProfileLike } from "../../../types/Like";

export const UserProfile = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "posts";
  const [user, setUser] = useState<User>();
  const [userComment, setUserComment] = useState<ProfileComment>();
  const [userRetweet, setUserRetweet] = useState<ProfileRetweet>();
  const [userLike, setUserLike] = useState<ProfileLike>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { deleteTweet } = useTweetDelete({
    setIsLoading,
    messageApi,
    onSuccess: () => fetchUserProfile(),
  });

  const { deleteComment } = useCommentDelete({
    setIsLoading,
    messageApi,
    onSuccess: () => fetchUserProfileComment(),
  });

  // 削除のpopover
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>(
    {}
  );

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

  const fetchUserProfileComment = async () => {
    try {
      const res = await authInstance.get<ProfileComment>(
        `/api/user/${id}/comments/`
      );
      setUserComment(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfileRetwet = async () => {
    try {
      const res = await authInstance.get<ProfileRetweet>(
        `/api/user/${id}/retweet/`
      );
      setUserRetweet(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserProfileLike = async () => {
    try {
      const res = await authInstance.get<ProfileLike>(`/api/user/${id}/like/`);
      setUserLike(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollow = async () => {
    try {
      await authInstance.post(`/api/users/${id}/follow/`);
      fetchUserProfile();
      messageApi.success("フォローしました");
    } catch (error) {
      messageApi.error("フォローできませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnFollow = async () => {
    try {
      await authInstance.delete(`/api/users/${id}/unfollow/`);
      messageApi.success("フォローを解除しました");
      fetchUserProfile();
    } catch (error) {
      messageApi.error("フォローを解除できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfileComment();
    fetchUserProfileRetwet();
    fetchUserProfileLike();
    fetchUserProfile();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    fetchUserProfile();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "posts":
        return (
          <ProfilePostList
            user={user}
            deleteTweet={deleteTweet}
            openPopovers={openPopovers}
            handleOpenChange={handleOpenChange}
          />
        );
      case "comments":
        return (
          <ProfileCommentList
            user={user}
            userComment={userComment}
            deleteComment={deleteComment}
            openPopovers={openPopovers}
            handleOpenChange={handleOpenChange}
          />
        );
      case "likes":
        return <ProfileLikesList userLike={userLike} />;
      case "retweets":
        return <ProfileRetweetsList userRetweet={userRetweet} />;
      default:
        return null;
    }
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
                {user?.loginUser ? (
                  <>
                    <Button type="text" onClick={showModal}>
                      プロフィールを編集
                    </Button>
                    <UserProfileUpdateModal
                      user={user}
                      isLoading={isLoading}
                      isModalOpen={isModalOpen}
                      handleOk={handleOk}
                      handleCancel={handleCancel}
                    />
                  </>
                ) : user?.following ? (
                  <Button
                    onClick={handleUnFollow}
                    style={{ borderRadius: "100px", fontWeight: "bold" }}
                  >
                    フォロー中
                  </Button>
                ) : (
                  <Button
                    onClick={handleFollow}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "100px",
                      fontWeight: "bold",
                    }}
                  >
                    フォロー
                  </Button>
                )}
              </div>
            </div>
            <div style={{ paddingLeft: "8px", marginTop: "80px" }}>
              <Flex style={{ fontWeight: "bold" }}>
                {user?.accountName ?? "DefaultName"}
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

            <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
              <Link
                to={`/user/${id}?tab=posts`}
                style={{
                  textDecoration: "none",
                  color: currentTab === "posts" ? "#1DA1F2" : "inherit",
                  borderBottom:
                    currentTab === "posts" ? "2px solid #1DA1F2" : "none",
                  padding: "10px 0",
                }}
              >
                ポスト
              </Link>
              <Link
                to={`/user/${id}?tab=comments`}
                style={{
                  textDecoration: "none",
                  color: currentTab === "comments" ? "#1DA1F2" : "inherit",
                  borderBottom:
                    currentTab === "comments" ? "2px solid #1DA1F2" : "none",
                  padding: "10px 0",
                }}
              >
                コメント
              </Link>
              <Link
                to={`/user/${id}?tab=likes`}
                style={{
                  textDecoration: "none",
                  color: currentTab === "likes" ? "#1DA1F2" : "inherit",
                  borderBottom:
                    currentTab === "likes" ? "2px solid #1DA1F2" : "none",
                  padding: "10px 0",
                }}
              >
                いいね
              </Link>
              <Link
                to={`/user/${id}?tab=retweets`}
                style={{
                  textDecoration: "none",
                  color: currentTab === "retweets" ? "#1DA1F2" : "inherit",
                  borderBottom:
                    currentTab === "retweets" ? "2px solid #1DA1F2" : "none",
                  padding: "10px 0",
                }}
              >
                リツイート
              </Link>
            </div>

            <div>{renderTabContent()}</div>
          </div>
        )}
      </Baselayout>
    </>
  );
};
