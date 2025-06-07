import { Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../../utils/client";
import type { Tweet } from "../../../types/Tweet";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import { getAuthToken } from "../../../utils/auth";
import { Button } from "../../atoms/Button/Button";
import { Message } from "../../atoms/Message";
import { CommentCreateModal } from "../modals/CommentCreateModal";
import { Loading } from "../loading/Loading";
import type { Comment } from "../../../types/Comment";
import type { PaginatedResponse } from "../../../types/PaginatedResponse";

export const TweetDetail = () => {
  const token = getAuthToken();
  const { id } = useParams();
  const [tweet, setTweet] = useState<Tweet>();
  const [comments, setComments] = useState<Comment[]>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchTweetDetail = async () => {
    try {
      const res = await instance.get<Tweet>(`/api/tweets/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTweet(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComment = async () => {
    try {
      const res = await instance.get<PaginatedResponse<Comment>>(
        `/api/tweets/${id}/comments/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
    }, 1000);
    fetchTweetDetail();
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
                <Flex style={{ display: "flex" }}>
                  <img
                    src={
                      tweet?.user.image
                        ? tweet.user.image
                        : "../../../人物アイコン.png"
                    }
                    style={{
                      width: "45px",
                      height: "45px",
                      borderRadius: "50%",
                    }}
                  />
                  <div style={{ marginLeft: "8px" }}>
                    <strong>
                      {tweet?.user.accountName && tweet.user.accountName}
                    </strong>
                    <Flex> @{tweet?.user.username && tweet.user.username}</Flex>
                  </div>
                </Flex>
                <Flex style={{ margin: "12px 0px" }}>
                  {tweet?.content && tweet.content}
                </Flex>
                {tweet?.tweetImage && (
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
                <Flex>
                  {tweet?.createdAt &&
                    dayjs(tweet.createdAt).format("YYYY年M月D日 HH:mm")}
                </Flex>
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
                      loading={loading}
                      isModalOpen={isModalOpen}
                      handleOk={handleOk}
                      handleCancel={handleCancel}
                    />
                  )}
                </div>
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
                              : "../../../人物アイコン.png"
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
                                {comment.user.accountName &&
                                  comment.user.accountName}
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
                            <Flex>{comment.comment}</Flex>
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
                          <div style={{ paddingTop: "8px" }}>
                            <Message width={"22px"} height={"22px"} />
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
