import { useCallback, useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import { authInstance } from "../../../utils/client";
import { message } from "antd";
import type { MessageGroup } from "../../../types/DirectMessage";
import { decodeJWT, getAuthToken } from "../../../utils/auth";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Loading } from "../loading/Loading";

export const MessageUserList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messageGroup, setMessageGroup] = useState<MessageGroup[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [userId, setUserId] = useState<number | null>(null);

  const fetchDMHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await authInstance.get(`/api/message-group/`);
      setMessageGroup(res.data);
    } catch (error) {
      messageApi.error("グループの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decodeToken = decodeJWT(token);
      if (decodeToken && decodeToken.user_id) {
        setUserId(decodeToken.user_id);
      }
    }
  }, []); // 依存配列に空配列を指定し無限ループを防ぐ

  useEffect(() => {
    fetchDMHistory();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Baselayout>
          {contextHolder}
          {messageGroup.map((messageList) => (
            <div
              key={messageList.id}
              style={{
                border: "solid 1px",
                borderColor: "#f5f5f5",
                width: "100%",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                    }}
                  >
                    {messageList.sender.id === userId ? (
                      <Link
                        to={`/message/${userId}/${messageList.recipient.username}`}
                        style={{ textDecoration: "None", color: "inherit" }}
                      >
                        <div style={{ display: "flex" }}>
                          <img
                            src={
                              messageList.recipient.image
                                ? messageList.recipient.image
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
                                  {messageList.recipient.accountName ??
                                    "DefaultName"}
                                </strong>
                                <span> @{messageList.recipient.username}</span>
                                <span>
                                  {" "}
                                  {messageList.recipient?.createdAt &&
                                    dayjs(
                                      messageList.recipient.createdAt
                                    ).format("YYYY年M月D日")}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to={`/message/${userId}/${messageList.sender.username}`}
                        style={{ textDecoration: "None", color: "inherit" }}
                      >
                        <div style={{ display: "flex" }}>
                          <img
                            src={
                              messageList.sender.image
                                ? messageList.sender.image
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
                                  {messageList.sender.accountName ??
                                    "DefaultName"}
                                </strong>
                                <span> @{messageList.sender.username}</span>
                                <span>
                                  {" "}
                                  {messageList.sender?.createdAt &&
                                    dayjs(messageList.sender.createdAt).format(
                                      "YYYY年M月D日"
                                    )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Baselayout>
      )}
    </>
  );
};
