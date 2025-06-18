import { Link } from "react-router-dom";
import { Flex } from "antd";
import type { ProfileLike } from "../../../types/Like";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { Message } from "../../atoms/Icon/Message";
import { Retweet } from "../../atoms/Icon/Retweet";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { OutLineLike } from "../../atoms/Icon/OutLineLike";

type ProfileLikesListProps = {
  userLike?: ProfileLike;
};

export const ProfileLikesList = ({ userLike }: ProfileLikesListProps) => {
  return (
    <div>
      {userLike?.like?.map((like) => (
        <div
          key={like.id}
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
                  <Link
                    to={`/user/${like.user.id}`}
                    style={{ textDecoration: "None", color: "inherit" }}
                  >
                    <img
                      src={
                        like.user.image
                          ? like.user.image
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
                          {like?.user.accountName ?? "DefaultName"}
                        </strong>
                        <span> @{like?.user.username ?? ""}</span>
                        <span>
                          {" "}
                          {like?.createdAt &&
                            dayjs(like.createdAt).format("YYYY年M月D日")}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Flex>{like.tweet.content}</Flex>
                      {like.tweet.image && (
                        <Flex
                          style={{
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={like.tweet.image}
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
                      <div
                        style={{
                          paddingTop: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Retweet width={"22px"} height={"22px"} />
                        {like?.retweetCount === 0 ? "" : like.retweetCount}
                      </div>
                      <div
                        style={{
                          paddingTop: "8px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <OutLineLike width={"22px"} height={"22px"} />
                        {like?.likeCount === 0 ? "" : like.likeCount}
                      </div>
                      <div style={{ paddingTop: "8px" }}>
                        <Button
                          type="text"
                          onClick={() => {}}
                          style={{ padding: 0 }}
                        >
                          <XLogoView width={"22px"} height={"22px"} />
                        </Button>
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
  );
};
