import { useEffect, useState } from "react";
import { instance } from "../../../utils/client";
import { Flex, message, Pagination, Space } from "antd";

type Tweet = {
  id: number;
  username: string;
  account_name?: string;
  content: string;
  image?: string | null;
  user_image: string;
  created_at: string;
};

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

  const fetchTweet = async (page: number) => {
    try {
      const offset = (page - 1) * pageSize;
      const res = await instance.get<PaginatedResponse>(
        `/api/tweets/?limit=${pageSize}&offset=${offset}`
      );
      console.log(res);
      setTotal(res.data.count);
      setTweets(res.data.results);
    } catch (error) {
      messageApi.error("表示できるTweetがありません");
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
            <img
              src={
                tweet.user_image
                  ? tweet.user_image
                  : "../../../人物アイコン.png"
              }
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
              }}
            />

            <div style={{ paddingLeft: "8px" }}>
              <strong>{tweet.account_name && tweet.account_name}</strong>
              <span> @{tweet.username}</span>
              <Flex>{tweet.content}</Flex>
              {tweet.image && (
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
                    }}
                  />
                </Flex>
              )}
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
  );
};
