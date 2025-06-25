import { Flex, message } from "antd";
import { authInstance } from "../../../utils/client";
import { useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import { Loading } from "../loading/Loading";
import type { Notification } from "../../../types/Notification";
import { FillLike } from "../../atoms/Icon/FillLike";
import { Retweet } from "../../atoms/Icon/Retweet";
import { UserOutline } from "../../atoms/Icon/UserOutline";

export const Notifications = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>();

  const fetchNotifications = async () => {
    try {
      const res = await authInstance.get<Notification[]>(`/api/notifications/`);
      setNotifications(res.data);
    } catch (error) {
      messageApi.error("データが取得できませんでした");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const notificationStatus = (notificationType: string) => {
    switch (notificationType) {
      case "LK":
        return (
          <FillLike width="40px" height="40px" style={{ color: "#ff1493" }} />
        );
      case "RT":
        return (
          <Retweet width="40px" height="40px" style={{ color: "#32cd32" }} />
        );
      case "CM":
        return <></>;
      case "FL":
        return (
          <UserOutline
            width="40px"
            height="40px"
            style={{ color: "#00bfff" }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {contextHolder}
      {isLoading ? (
        <Loading />
      ) : (
        <Baselayout>
          <div>
            {notifications?.map((notification) => (
              <Flex
                key={notification.id}
                style={{
                  border: "solid 1px",
                  borderColor: "#f5f5f5",
                }}
              >
                <Flex
                  style={{
                    display: "flex",
                    padding: "12px 16px",
                  }}
                >
                  <div>
                    {notification.notificationType === "CM" ? (
                      <>
                        <div>
                          {notificationStatus(notification.notificationType)}
                        </div>
                        <div>
                          <Flex style={{ display: "flex" }}>
                            <img
                              src={
                                notification?.sender.image
                                  ? notification.sender.image
                                  : "../../../defaultAccountImage.png"
                              }
                              style={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "50%",
                              }}
                            />
                            <div>
                              <Flex>
                                <Flex>
                                  <strong>
                                    {notification?.sender.accountName ??
                                      "DefaultName"}
                                  </strong>
                                  <Flex>
                                    {" "}
                                    @
                                    {notification?.sender.username &&
                                      notification.sender.username}
                                  </Flex>
                                </Flex>
                              </Flex>
                              <Flex style={{ margin: "12px 0px" }}>
                                {notification?.message ?? ""}
                              </Flex>
                            </div>
                          </Flex>
                        </div>
                      </>
                    ) : (
                      <>
                        <Flex>
                          <div style={{ paddingRight: "8px" }}>
                            {notificationStatus(notification.notificationType)}
                          </div>
                          <div>
                            <Flex
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Flex style={{ display: "flex" }}>
                                <img
                                  src={
                                    notification?.sender.image
                                      ? notification.sender.image
                                      : "../../../defaultAccountImage.png"
                                  }
                                  style={{
                                    width: "45px",
                                    height: "45px",
                                    borderRadius: "50%",
                                  }}
                                />
                                <Flex style={{ marginLeft: "8px" }}>
                                  <strong>
                                    {notification?.sender.accountName ??
                                      "DefaultName"}
                                  </strong>
                                  <Flex>
                                    {" "}
                                    @
                                    {notification?.sender.username &&
                                      notification.sender.username}
                                  </Flex>
                                </Flex>
                              </Flex>
                            </Flex>
                            <Flex style={{ margin: "12px 0px" }}>
                              {notification?.message ?? ""}
                            </Flex>
                          </div>
                        </Flex>
                      </>
                    )}
                  </div>
                </Flex>
              </Flex>
            ))}
          </div>
        </Baselayout>
      )}
    </>
  );
};
