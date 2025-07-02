import { useCallback, useEffect, useState } from "react";
import { Baselayout } from "./Baselayout";
import { authInstance } from "../../../utils/client";
import { message } from "antd";
import type { MessageGroup } from "../../../types/DirectMessage";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Loading } from "../loading/Loading";

export const MessageUserList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messageGroup, setMessageGroup] = useState<MessageGroup[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchDMHistory = useCallback(async () => {
    try {
      const res = await authInstance.get(`/api/message-group/`);
      setMessageGroup(res.data);
    } catch (error) {
      messageApi.error("グループの取得に失敗しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDMHistory();
  }, []);

  if (isLoading) return <Loading />;
  return (
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
                <Link
                  to={`/message/${messageList.user.username}`}
                  style={{ textDecoration: "None", color: "inherit" }}
                >
                  <div style={{ display: "flex" }}>
                    <img
                      src={
                        messageList.user.image
                          ? messageList.user.image
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
                            {messageList.user.accountName ?? "DefaultName"}
                          </strong>
                          <span> @{messageList.user.username}</span>
                          <span>
                            {" "}
                            {messageList.createdAt &&
                              dayjs(messageList.createdAt).format(
                                "YYYY年M月D日"
                              )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Baselayout>
  );
};
