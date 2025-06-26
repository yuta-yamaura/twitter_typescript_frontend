import { useEffect, useState } from "react";
import { authInstance } from "../../../utils/client";
import { Flex, message, Pagination, Popover } from "antd";
import { Link } from "react-router-dom";
import type { Tweet } from "../../../types/Tweet";
import { Loading } from "../loading/Loading";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { DashOutline } from "../../atoms/Icon/DashOutline";
import { Message } from "../../atoms/Icon/Message";
import { CommentCreateModal } from "../modals/CommentCreateModal";
import type { PaginatedResponse } from "../../../types/PaginatedResponse";
import { useTweetDelete } from "../../../utils/useTweetDelete";
import { Retweet } from "../../atoms/Icon/Retweet";
import { FillLike } from "../../atoms/Icon/FillLike";
import { OutLineLike } from "../../atoms/Icon/OutLineLike";
import { BookmarkFill } from "../../atoms/Icon/BookmarkFill";
import { BookmarkOutline } from "../../atoms/Icon/BookmarkOutline";

export const TweetsList = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTweet, setSelectedTweet] = useState<Tweet>();
  const [loading, setLoading] = useState(false);
  const { deleteTweet } = useTweetDelete({
    setIsLoading,
    messageApi,
    onSuccess: () => fetchTweet(currentPage),
  });

  // 削除のpopover
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [retweeted, setRetweeted] = useState<{ [key: number]: boolean }>({});
  const [likeed, setLikeed] = useState<{ [key: number]: boolean }>({});
  const [bookmarked, setBookmarked] = useState<{ [key: number]: boolean }>({});

  const handleOpenChange = (tweetId: number, newOpen: boolean) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [tweetId]: newOpen,
    }));
  };

  const handleRetweetChange = (tweetId: number, retweet: boolean) => {
    setRetweeted((prev) => ({
      ...prev,
      [tweetId]: retweet,
    }));
  };

  const handleLikeChange = (tweetId: number, like: boolean) => {
    setLikeed((prev) => ({
      ...prev,
      [tweetId]: like,
    }));
  };

  const handleBookmarkChange = (tweetId: number, bookmark: boolean) => {
    setBookmarked((prev) => ({
      ...prev,
      [tweetId]: bookmark,
    }));
  };

  const fetchTweet = async (page: number) => {
    try {
      const offset = (page - 1) * pageSize;
      const res = await authInstance.get<PaginatedResponse<Tweet>>(
        `/api/tweets/?limit=${pageSize}&offset=${offset}`
      );
      setTotal(res.data.count);
      setTweets(res.data.results);
    } catch (error) {
      messageApi.error("表示できるTweetがありません");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetweet = async (id: number) => {
    try {
      await authInstance.post(`/api/tweets/${id}/retweet/`);
      handleRetweetChange(id, !retweeted[id]);
      messageApi.success("リツイートしました");
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("リツイートできませんでした");
    }
  };

  const handleUnRetweet = async (id: number) => {
    try {
      await authInstance.delete(`/api/tweets/${id}/unretweet/`);
      handleRetweetChange(id, !retweeted[id]);
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("リツイートを削除できませんでした");
    }
  };

  const handleLike = async (id: number) => {
    try {
      await authInstance.post(`/api/tweets/${id}/like/`);
      handleLikeChange(id, !likeed[id]);
      messageApi.success("いいねしました");
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("いいねできませんでした");
    }
  };

  const handleUnLike = async (id: number) => {
    try {
      await authInstance.delete(`/api/tweets/${id}/unlike/`);
      handleLikeChange(id, !likeed[id]);
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("いいねを削除できませんでした");
    }
  };

  const handleBookmark = async (id: number) => {
    try {
      await authInstance.post(`/api/tweets/${id}/bookmark/`);
      handleBookmarkChange(id, !bookmarked[id]);
      messageApi.success("ブックマークしました");
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("ブックマークできませんでした");
    }
  };

  const handleUnBookmark = async (id: number) => {
    try {
      await authInstance.delete(`/api/tweets/${id}/unbookmark/`);
      handleBookmarkChange(id, !bookmarked[id]);
      fetchTweet(currentPage);
    } catch (error) {
      messageApi.error("ブックマークを削除できませんでした");
    }
  };

  useEffect(() => {
    fetchTweet(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (tweet: Tweet) => {
    setSelectedTweet(tweet);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setLoading(false);
    setIsModalOpen(false);
    fetchTweet(currentPage);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {tweets?.map((tweet) => (
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
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    <Link
                      to={`/user/${tweet.user.id}/`}
                      style={{ textDecoration: "None", color: "inherit" }}
                    >
                      <img
                        src={
                          tweet.user.image
                            ? tweet.user.image
                            : "../../../defaultAccountImage.png"
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
                          <strong style={{ fontSize: "16px" }}>
                            {tweet.user.accountName ?? "DefaultName"}
                          </strong>
                          <span> @{tweet.user.username}</span>
                          <span>
                            {" "}
                            {tweet.user?.createdAt &&
                              dayjs(tweet.user.createdAt).format(
                                "YYYY年M月D日"
                              )}
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
                          {tweet.image && (
                            <Flex
                              style={{
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={tweet.image}
                                style={{
                                  maxWidth: "100%",
                                  maxHeight: "300px",
                                  borderRadius: "20px",
                                  marginTop: "8px",
                                }}
                              />
                            </Flex>
                          )}
                        </div>
                      </Link>
                      <Flex
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ paddingTop: "8px" }}>
                          <Button
                            type="text"
                            onClick={() => handleOpenModal(tweet)}
                            style={{ padding: 0 }}
                          >
                            <Message width={"22px"} height={"22px"} />
                          </Button>
                          {selectedTweet?.id === tweet.id && (
                            <CommentCreateModal
                              tweet={tweet}
                              loading={loading}
                              isModalOpen={isModalOpen}
                              handleOk={handleOk}
                              handleCancel={handleCancel}
                            />
                          )}
                        </div>
                        {tweet.loginUserRetweeted ? (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleUnRetweet(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <Retweet
                                width={"22px"}
                                height={"22px"}
                                style={{ color: "#32cd32" }}
                              />
                            </Button>
                            {tweet?.retweetCount === 0 ? (
                              ""
                            ) : (
                              <span style={{ color: "#32cd32" }}>
                                {tweet.retweetCount}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleRetweet(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <Retweet width={"22px"} height={"22px"} />
                            </Button>
                            {tweet?.retweetCount === 0
                              ? ""
                              : tweet.retweetCount}
                          </div>
                        )}
                        {tweet.loginUserLiked ? (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleUnLike(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <FillLike
                                width={"22px"}
                                height={"22px"}
                                style={{ color: "#ff1493" }}
                              />
                            </Button>
                            {tweet?.likeCount === 0 ? (
                              ""
                            ) : (
                              <span style={{ color: "#ff1493" }}>
                                {tweet.likeCount}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleLike(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <OutLineLike width={"22px"} height={"22px"} />
                            </Button>
                            {tweet?.likeCount === 0 ? "" : tweet.likeCount}
                          </div>
                        )}
                        {tweet.loginUserBookmarked ? (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleUnBookmark(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <BookmarkFill
                                width={"22px"}
                                height={"22px"}
                                style={{ color: "#00bfff" }}
                              />
                            </Button>
                          </div>
                        ) : (
                          <div
                            style={{
                              paddingTop: "8px",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              type="text"
                              onClick={() => {
                                handleBookmark(tweet.id);
                              }}
                              style={{ padding: 0 }}
                            >
                              <BookmarkOutline width={"22px"} height={"22px"} />
                            </Button>
                          </div>
                        )}
                      </Flex>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              current={currentPage}
              total={total}
              pageSize={pageSize}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};
