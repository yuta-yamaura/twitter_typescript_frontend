import { Flex, message, Popover } from "antd";
import { useParams } from "react-router-dom";
import { authInstance } from "../../../utils/client";
import type { Tweet } from "../../../types/Tweet";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { Message } from "../../atoms/Icon/Message";
import { CommentCreateModal } from "../modals/CommentCreateModal";
import { Loading } from "../loading/Loading";
import type { Comment } from "../../../types/Comment";
import type { PaginatedResponse } from "../../../types/PaginatedResponse";
import { DashOutline } from "../../atoms/Icon/DashOutline";
import { useTweetDelete } from "../../../utils/useTweetDelete";
import { Retweet } from "../../atoms/Icon/Retweet";
import { FillLike } from "../../atoms/Icon/FillLike";
import { OutLineLike } from "../../atoms/Icon/OutLineLike";
import { BookmarkFill } from "../../atoms/Icon/BookmarkFill";
import { BookmarkOutline } from "../../atoms/Icon/BookmarkOutline";

export const TweetDetail = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<Tweet>();
  const [comments, setComments] = useState<Comment[]>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteTweet } = useTweetDelete({
    setIsLoading,
    messageApi,
    onSuccess: () => fetchTweetDetail(),
  });
  // 削除のpopover
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>({});
  const handleOpenChange = (tweetId: number, newOpen: boolean) => {
    setOpenPopovers(() => ({
      [tweetId]: newOpen,
    }));
  };

  const fetchTweetDetail = async () => {
    try {
      const res = await authInstance.get<Tweet>(`/api/tweets/${id}/`);
      setTweet(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await authInstance.get<PaginatedResponse<Comment>>(
        `/api/tweets/${id}/comments/`
      );
      setComments(res.data.results);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTweetDetail();
    fetchComment();
  }, []);

  const handleOpenModal = (tweet: Tweet) => {
    setTweet(tweet);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsLoading(true);
    setComments(comments);
    setIsLoading(false);
    fetchTweetDetail();
    fetchComment();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Baselayout>
          {contextHolder}
          <Flex
            key={id}
            style={{
              border: "solid 1px",
              borderColor: "#f5f5f5",
            }}
          >
            <Flex
              style={{
                display: "flex",
                padding: "12px 16px",
              }}
            >
              <div>
                <Flex
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Flex style={{ display: "flex" }}>
                    <img
                      src={
                        tweet?.user.image
                          ? tweet.user.image
                          : "../../../defaultAccountImage.png"
                      }
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                      }}
                    />
                    <Flex style={{ marginLeft: "8px" }}>
                      <strong>
                        {tweet?.user.accountName ?? "DefaultName"}
                      </strong>
                      <Flex>
                        {" "}
                        @{tweet?.user.username && tweet.user.username}
                      </Flex>
                    </Flex>
                  </Flex>

                  {tweet && (
                    <Popover
                      content={
                        <Flex
                          onClick={() => deleteTweet(tweet.id)}
                          style={{ cursor: "pointer" }}
                        >
                          削除
                        </Flex>
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
                  )}
                </Flex>
                <Flex style={{ margin: "12px 0px" }}>
                  {tweet?.content && tweet.content}
                </Flex>
                {tweet?.image && (
                  <Flex
                    style={{
                      display: "flex",
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
                      }}
                    />
                  </Flex>
                )}
                <Flex>
                  {tweet?.createdAt &&
                    dayjs(tweet.createdAt).format("YYYY年M月D日 HH:mm")}
                </Flex>
                <Flex
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ paddingTop: "8px" }}>
                    {tweet && (
                      <Button
                        type="text"
                        onClick={() => handleOpenModal(tweet)}
                        style={{ padding: 0 }}
                      >
                        <Message width={"22px"} height={"22px"} />
                      </Button>
                    )}
                    {tweet && (
                      <CommentCreateModal
                        tweet={tweet}
                        loading={isLoading}
                        isModalOpen={isModalOpen}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                      />
                    )}
                  </div>
                  {tweet?.loginUserRetweeted ? (
                    <div
                      style={{
                        paddingTop: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Retweet
                        width={"22px"}
                        height={"22px"}
                        style={{ color: "#32cd32" }}
                      />
                      {tweet.retweetCount === 0 ? (
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
                      <Retweet width={"22px"} height={"22px"} />
                      {tweet?.retweetCount === 0 ? "" : tweet?.retweetCount}
                    </div>
                  )}
                  {tweet?.loginUserLiked ? (
                    <div
                      style={{
                        paddingTop: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FillLike
                        width={"22px"}
                        height={"22px"}
                        style={{ color: "#ff1493" }}
                      />
                      {tweet.likeCount === 0 ? (
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
                      <OutLineLike width={"22px"} height={"22px"} />
                      {tweet?.likeCount === 0 ? "" : tweet?.likeCount}
                    </div>
                  )}
                  {tweet?.loginUserBookmarked ? (
                    <div
                      style={{
                        paddingTop: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BookmarkFill
                        width={"22px"}
                        height={"22px"}
                        style={{ color: "#00bfff" }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        paddingTop: "8px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <BookmarkOutline width={"22px"} height={"22px"} />
                    </div>
                  )}
                </Flex>
              </div>
            </Flex>
          </Flex>
          <div>
            {comments &&
              comments.map((comment) => (
                <div
                  key={comment.id}
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
                        <img
                          src={
                            comment.user.image
                              ? comment.user.image
                              : "../../../defaultAccountImage.png"
                          }
                          style={{
                            width: "45px",
                            height: "45px",
                            borderRadius: "50%",
                            marginRight: "8px",
                          }}
                        />
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
                                {comment.user.accountName ?? "DefaultName"}
                              </strong>
                              <span> @{comment.user.username}</span>
                              <span>
                                {" "}
                                {comment.user?.createdAt &&
                                  dayjs(comment.user.createdAt).format(
                                    "YYYY年M月D日"
                                  )}
                              </span>
                            </div>
                          </div>
                          <div key={comment.id}>
                            <Flex>{comment.content}</Flex>
                            {comment.image && (
                              <Flex
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={comment.image}
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Baselayout>
      )}
    </>
  );
};
