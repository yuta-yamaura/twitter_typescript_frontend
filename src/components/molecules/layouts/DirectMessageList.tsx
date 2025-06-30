import { useCallback, useEffect, useState } from "react";
import { Loading } from "../loading/Loading";
import { useParams } from "react-router-dom";
import type { DirectMessage } from "../../../types/DirectMessage";
import dayjs from "dayjs";
import { message } from "antd";
import { instance } from "../../../utils/client";
import { Baselayout } from "./Baselayout";
import { Button } from "../../atoms/Button/Button";
import { SendOutline } from "../../atoms/Icon/SendOutline";
import { getAuthToken } from "../../../utils/auth";
import { useSentMessage } from "../../../utils/useSentMessage";

export const DirectMessageList = () => {
  const { username } = useParams();
  const token = getAuthToken();
  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [newMessage, setNewMessage] = useState<DirectMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<DirectMessage[]>([]);
  const [directMessage, setDirectMessage] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const connectWebSocket = () => {
    const ws = new WebSocket(
      `ws://127.0.0.1:8000/ws/${username}?token=${token}`
    );
    ws.onopen = () => {
      console.log("Connected!");
      setSocket(ws);
      setIsLoading(false);
    };
    ws.onmessage = (msg) => {
      setMessagesFnc(JSON.parse(msg.data));
    };
    (ws.onclose = () => {
      console.log("Closed!");
    }),
      (ws.onerror = () => {
        console.log("Error!");
      });
  };

  const fetchDMHistory = useCallback(async () => {
    if (!username) return;
    try {
      const res = await instance.get(`/api/chat-history/${username}/`);
      setChatHistory(res.data);
    } catch (error) {
      messageApi.error("メッセージの取得に失敗しました");
    }
  }, []);

  useEffect(() => {
    fetchDMHistory();
  }, []);

  const setMessagesFnc = (value: any) => {
    // 送信者の送信メッセージは受信と判定させない処理
    if (value.new_message) {
      return;
    }
  };

  const sendMessage = () => {
    const messageData = {
      type: "message",
      content: directMessage,
    };
    socket?.send(JSON.stringify(messageData));

    if (username) {
      const sentMessage = useSentMessage(directMessage, username);
      setNewMessage((prev_msg) => [...prev_msg, sentMessage]);
    }
    setDirectMessage("");
  };

  useEffect(() => {
    connectWebSocket();
    fetchDMHistory();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Baselayout>
            {contextHolder}
            <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
              <div style={{ width: "100%" }}>
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    style={{ width: "100%", marginBottom: "12px" }}
                  >
                    {chat.sender.username !== username &&
                    chat.content !== null ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              backgroundColor: "#1DA1F2",
                              color: "white",
                              padding: "8px 12px",
                              borderTopLeftRadius: "18px",
                              borderTopRightRadius: "18px",
                              borderBottomLeftRadius: "18px",
                              wordWrap: "break-word",
                              whiteSpace: "pre-wrap",
                              display: "flex",
                              justifyContent: "flex-end",
                              marginLeft: "auto",
                              width: "fit-content",
                            }}
                          >
                            {chat.content}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#666",
                              marginTop: "4px",
                              textAlign: "right",
                            }}
                          >
                            {dayjs(chat.createdAt).format(
                              "YYYY年M月D日 H時m分"
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      chat.content !== null && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            width: "100%",
                          }}
                        >
                          <div>
                            <div
                              style={{
                                backgroundColor: "#f0f0f0",
                                color: "#333",
                                padding: "8px 12px",
                                borderTopLeftRadius: "18px",
                                borderTopRightRadius: "18px",
                                borderBottomRightRadius: "18px",
                                display: "inline-block",
                                width: "fit-content",
                                wordWrap: "break-word",
                                whiteSpace: "pre-wrap",
                              }}
                            >
                              {chat.content}
                            </div>
                            <div
                              style={{
                                fontSize: "12px",
                                color: "#666",
                                marginTop: "4px",
                                textAlign: "left",
                              }}
                            >
                              {dayjs(chat.createdAt).format(
                                "YYYY年M月D日 H時m分"
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                ))}
                {newMessage.map((msg, index) => {
                  return (
                    <div
                      key={index}
                      style={{ width: "100%", marginBottom: "12px" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#1DA1F2",
                            color: "white",
                            padding: "8px 12px",
                            borderTopLeftRadius: "18px",
                            borderTopRightRadius: "18px",
                            borderBottomLeftRadius: "18px",
                            maxWidth: "70%",
                            wordWrap: "break-word",
                          }}
                        >
                          {msg.content}
                        </div>
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#666",
                          marginTop: "4px",
                          textAlign: "right",
                        }}
                      >
                        {dayjs(msg.createdAt).format("YYYY年M月D日 H時m分")}
                      </div>
                    </div>
                  );
                })}
                <form style={{ marginTop: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <input
                      type="text"
                      value={directMessage}
                      onChange={(e) => setDirectMessage(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #d0d0d0",
                        borderRadius: "4px",
                        marginRight: "8px",
                      }}
                      placeholder="新しいメッセージを作成"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        onClick={sendMessage}
                        type="text"
                        style={{
                          marginTop: "-33px",
                          position: "absolute",
                          padding: "8px 16px",
                          border: "none",
                          borderRadius: "4px",
                        }}
                        disabled={directMessage == "" || directMessage == null}
                      >
                        <SendOutline
                          width={"24px"}
                          height={"24px"}
                          style={{
                            color:
                              directMessage == "" || directMessage == null
                                ? "#ccc"
                                : "#1DA1F2",
                          }}
                        />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Baselayout>
        </>
      )}
    </>
  );
};
