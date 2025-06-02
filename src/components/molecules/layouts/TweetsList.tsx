import { useEffect, useState } from "react";
import { instance } from "../../../utils/client";
import { Flex, message, Pagination } from "antd";
import { Link } from "react-router-dom";
import type { Tweet } from "../../../types/Tweet";
import { Loading } from "../loading/Loading";

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
      const res = await instance.get<PaginatedResponse>(
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

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {contextHolder}
          {tweets?.map((tweet) => (
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

                <div style={{ paddingLeft: "8px" }}>
                  <Link
                    to={`/tweet/${tweet.id}`}
                    style={{ textDecoration: "None", color: "inherit" }}
                  >
                    <strong>
                      {tweet.user.accountName && tweet.user.accountName}
                    </strong>
                    <span> @{tweet.user.username}</span>
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
    </div>
  );
};
