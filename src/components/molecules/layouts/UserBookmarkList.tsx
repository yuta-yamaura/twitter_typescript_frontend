import { useParams } from "react-router-dom";
import { Flex, message } from "antd";
import dayjs from "dayjs";
import { Message } from "../../atoms/Icon/Message";
import type { Bookmark } from "../../../types/Bookmark";
import { authInstance } from "../../../utils/client";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import { Loading } from "../loading/Loading";
import { Retweet } from "../../atoms/Icon/Retweet";
import { OutLineLike } from "../../atoms/Icon/OutLineLike";
import { BookmarkFill } from "../../atoms/Icon/BookmarkFill";
import { FillLike } from "../../atoms/Icon/FillLike";

export const UserBookmarkList = () => {
  const { id } = useParams();
  const [userBookmark, setUserBookmark] = useState<Bookmark>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserBookmarkList = async () => {
    try {
      const res = await authInstance.get<Bookmark>(`/api/${id}/bookmark/`);
      setUserBookmark(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookmarkList();
  }, []);

  return (
    <>
      <Baselayout>
        {contextHolder}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {userBookmark?.bookmark.map((bookmark) => (
              <div
                key={bookmark.id}
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
                    <div style={{ paddingLeft: "8px" }}>
                      <div
                        style={{
                          display: "flex",
                        }}
                      >
                        <img
                          src={
                            bookmark.user.image
                              ? bookmark.user.image
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
                                {bookmark?.user.accountName ?? "DefaultName"}
                              </strong>
                              <span> @{bookmark?.user.username ?? ""}</span>
                              <span>
                                {" "}
                                {bookmark?.createdAt &&
                                  dayjs(bookmark.createdAt).format(
                                    "YYYY年M月D日"
                                  )}
                              </span>
                            </div>
                          </div>
                          <div>
                            <Flex>{bookmark.tweet.content}</Flex>
                            {bookmark.tweet.image && (
                              <Flex
                                style={{
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  src={bookmark.tweet.image}
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "300px",
                                    borderRadius: "20px",
                                  }}
                                />
                              </Flex>
                            )}
                          </div>
                          <Flex
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <div
                              style={{
                                paddingTop: "8px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Message width={"22px"} height={"22px"} />
                            </div>
                            {bookmark.loginUserRetweeted ? (
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
                                {bookmark?.retweetCount === 0 ? (
                                  ""
                                ) : (
                                  <span style={{ color: "#32cd32" }}>
                                    {bookmark.retweetCount}
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
                                {bookmark?.retweetCount === 0
                                  ? ""
                                  : bookmark.retweetCount}
                              </div>
                            )}
                            {bookmark.loginUserLiked ? (
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
                                {bookmark?.likeCount === 0 ? (
                                  ""
                                ) : (
                                  <span style={{ color: "#ff1493" }}>
                                    {bookmark.likeCount}
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
                                {bookmark?.likeCount === 0
                                  ? ""
                                  : bookmark.likeCount}
                              </div>
                            )}
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
                          </Flex>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Baselayout>
    </>
  );
};
