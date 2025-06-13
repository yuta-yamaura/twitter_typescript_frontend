import { useEffect, useState } from "react";
import { authInstance } from "../../../utils/client";
import { Flex, message, Pagination, Popover } from "antd";
import { Link } from "react-router-dom";
import type { Tweet } from "../../../types/Tweet";
import { Loading } from "../loading/Loading";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { DashOutline } from "../../atoms/DashOutline";
import { Message } from "../../atoms/Message";
import { CommentCreateModal } from "../modals/CommentCreateModal";
import type { PaginatedResponse } from "../../../types/PaginatedResponse";
import { useTweetDelete } from "../../../utils/useTweetDelete";

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
  const [openPopovers, setOpenPopovers] = useState<{ [key: number]: boolean }>({});

  const handleOpenChange = (tweetId: number, newOpen: boolean) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [tweetId]: newOpen,
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
                          <strong>
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
