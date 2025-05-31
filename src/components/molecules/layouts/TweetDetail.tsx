import { Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { instance } from "../../../utils/client";
import type { Tweet } from "../../../types/Tweet";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";

export const TweetDetail = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<Tweet>();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchTweetDetail = async () => {
    try {
      const res = await instance.get<Tweet>(`/api/tweets/${id}/`);
      setTweet(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    }
  };

  useEffect(() => {
    fetchTweetDetail();
  }, []);

  return (
    <>
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
              paddingTop: "12px",
              paddingLeft: "16px",
              paddingBottom: "12px",
            }}
          >
            <div style={{ paddingLeft: "8px" }}>
              <Flex style={{ display: "flex" }}>
                <img
                  src={
                    tweet?.user_image
                      ? tweet.user_image
                      : "../../../人物アイコン.png"
                  }
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                  }}
                />
                <div style={{ marginLeft: "8px" }}>
                  <strong>{tweet?.account_name && tweet.account_name}</strong>
                  <Flex> @{tweet?.username && tweet.username}</Flex>
                </div>
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
                {tweet?.created_at &&
                  dayjs(tweet.created_at).format("YYYY年M月DD日 HH:mm")}
              </Flex>
            </div>
          </Flex>
        </Flex>
      </Baselayout>
    </>
  );
};
