import { useEffect, useState } from "react";
import { authInstance } from "../../../utils/client";
import { Flex, message, Pagination } from "antd";
import { Link } from "react-router-dom";
import type { Tweet } from "../../../types/Tweet";
import { Loading } from "../loading/Loading";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { DashOutline } from "../../atoms/DashOutline";

type PaginatedResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: Tweet[];
};

export const TweetsList = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>();
  const pageSize = 5;
  const [isLoading, setIsLoading] = useState(true);

  const fetchTweet = async (page: number) => {
    try {
      const offset = (page - 1) * pageSize;
      const res = await authInstance.get<PaginatedResponse>(`/api/tweets/?limit=${pageSize}&offset=${offset}`);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {contextHolder}
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
                        <Button type="text" style={{ padding: 0 }}>
                          <DashOutline
                            width="24px"
                            height="24px"
                            style={{ justifyContent: "end" }}
                          />
                        </Button>
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
