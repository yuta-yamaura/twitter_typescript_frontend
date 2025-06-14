import { Link } from "react-router-dom";
import type { User } from "../../../types/User";
import { Button, Flex, Popover } from "antd";
import dayjs from "dayjs";
import type { ProfileComment } from "../../../types/Comment";
import { DashOutline } from "../../atoms/Icon/DashOutline";

type ProfileCommentProps = {
  user?: User;
  userComment?: ProfileComment;
  deleteComment: (id: number) => void;
  openPopovers: { [key: number]: boolean };
  handleOpenChange: (tweetId: number, newOpen: boolean) => void;
};

export const ProfileCommentList = ({
  user,
  userComment,
  deleteComment,
  openPopovers,
  handleOpenChange,
}: ProfileCommentProps) => {
  return (
    <div>
      {userComment?.comments.map((comment) => (
        <div
          key={comment.id}
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
              <div key={comment.id} style={{ paddingLeft: "8px" }}>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Link
                    to={`/user/${comment.user.id}`}
                    style={{ textDecoration: "None", color: "inherit" }}
                  >
                    <img
                      src={
                        comment.user.image
                          ? comment.user.image
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
                        <strong>{user?.accountName ?? "DefaultName"}</strong>
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
                            onClick={() => deleteComment(comment.id)}
                            style={{ cursor: "pointer" }}
                          >
                            削除
                          </div>
                        }
                        trigger="click"
                        open={openPopovers[comment.id]}
                        onOpenChange={(newOpen) =>
                          handleOpenChange(comment.id, newOpen)
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
                      to={`/tweet/${comment.id}`}
                      style={{ textDecoration: "None", color: "inherit" }}
                    >
                      <div key={comment.id}>
                        <Flex>{comment.comment}</Flex>
                        {comment.image && (
                          <Flex
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src={comment.image}
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
