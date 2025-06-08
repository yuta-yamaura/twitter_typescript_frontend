import { Flex, message } from "antd";
import { useParams } from "react-router-dom";
import { authInstance } from "../../../utils/client";
import type { Tweet } from "../../../types/Tweet";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { DashOutline } from "../../atoms/DashOutline";
import { Loading } from "../loading/Loading";

export const TweetDetail = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<Tweet>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    fetchTweetDetail();
  }, []);

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
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex" }}>
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
                        marginRight: "8px",
                      }}
                    />
                    <div>
                      <strong>
                        {tweet?.user.accountName ?? "DefaultName"}
                      </strong>
                      <Flex>
                        {" "}
                        @{tweet?.user.username && tweet.user.username}
                      </Flex>
                    </div>
                  </div>
                  <Button type="text" style={{ padding: 0 }}>
                    <DashOutline
                      width="24px"
                      height="24px"
                      style={{ justifyContent: "end" }}
                    />
                  </Button>
                </div>
                <Flex style={{ marginTop: "8px" }}>
                  {tweet?.content && tweet.content}
                </Flex>
                {tweet?.image && (
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
                <Flex style={{ marginTop: "8px" }}>
                  {tweet?.createdAt &&
                    dayjs(tweet.createdAt).format("YYYY年M月D日 HH:mm")}
                </Flex>
              </div>
            </div>
          </div>
        )}
      </Baselayout>
    </>
  );
};
