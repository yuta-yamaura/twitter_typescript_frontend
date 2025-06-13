import { Link } from "react-router-dom";
import type { User } from "../../../types/User";
import { Flex, Popover } from "antd";
import dayjs from "dayjs";
import { Button } from "../../atoms/Button/Button";
import { DashOutline } from "../../atoms/DashOutline";

type ProfilePostListProps = {
  user?: User;
  deleteTweet: (id: number) => void;
  openPopovers: { [key: number]: boolean };
  handleOpenChange: (tweetId: number, newOpen: boolean) => void;
};

export const ProfilePostList = ({
  user,
  deleteTweet,
  openPopovers,
  handleOpenChange,
}: ProfilePostListProps) => {
  return (
    <div>
      {user?.tweets?.map((tweet) => (
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
              <div key={tweet.id} style={{ paddingLeft: "8px" }}>
                <div
                  style={{
                    display: "flex",
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
                        <strong>{user?.accountName ?? ""}</strong>
                        <span> @{user?.username && user.username}</span>
                        <span>
                          {" "}
                          {user?.createdAt &&
                            dayjs(user.createdAt).format("YYYY年M月D日")}
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
        </div>
      ))}
    </div>
  );
};
