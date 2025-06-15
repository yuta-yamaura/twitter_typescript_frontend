import { Link } from "react-router-dom";
import { Flex } from "antd";
import type { ProfileRetweet } from "../../../types/Retweet";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { Message } from "../../atoms/Icon/Message";
import { Retweet } from "../../atoms/Icon/Retweet";
import { XLogoView } from "../../atoms/Icon/XLogoView";

type ProfileRetweetsListProps = {
  userRetweet?: ProfileRetweet;
};

export const ProfileRetweetsList = ({
  userRetweet,
}: ProfileRetweetsListProps) => {
  return (
    <div>
      {userRetweet?.retweet?.map((retweet) => (
        <div
          key={retweet.id}
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
              <div key={retweet.id} style={{ paddingLeft: "8px" }}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Link
                    to={`/user/${retweet.user.id}`}
                    style={{ textDecoration: "None", color: "inherit" }}
                  >
                    <img
                      src={
                        retweet.user.image
                          ? retweet.user.image
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
                          {retweet?.user.accountName ?? "DefaultName"}
                        </strong>
                        <span>
                          {" "}
                          @{retweet?.user.username && retweet.username}
                        </span>
                        <span>
                          {" "}
                          {retweet?.createdAt &&
                            dayjs(retweet.createdAt).format("YYYY年M月D日")}
                        </span>
                      </div>
                    </div>
                    <Link
                      to={`/tweet/${retweet.retweet}`}
                      style={{ textDecoration: "None", color: "inherit" }}
                    >
                      <div key={retweet.id}>
                        <Flex>{retweet.tweet.content}</Flex>
                        {retweet.tweet.image && (
                          <Flex
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={retweet.tweet.image}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "300px",
                                borderRadius: "20px",
                              }}
                            />
                          </Flex>
                        )}
                      </div>
                    </Link>
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
                      {retweet ? (
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
                          {retweet.retweetCount === 0 ? (
                            ""
                          ) : (
                            <span style={{ color: "#32cd32" }}>
                              {retweet.retweetCount}
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
                        </div>
                      )}
                      <div style={{ paddingTop: "8px" }}>
                        <Button
                          type="text"
                          onClick={() => {}}
                          style={{ padding: 0 }}
                        >
                          <XLogoView width={"22px"} height={"22px"} />
                        </Button>
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
