import { useCallback, useEffect, useRef, useState } from "react";
import { Loading } from "../loading/Loading";
import useWebSocket from "react-use-websocket";
import { useParams } from "react-router-dom";
import type { DirectMessage } from "../../../types/DirectMessage";
import dayjs from "dayjs";
import { message } from "antd";
import { instance } from "../../../utils/client";
import { Baselayout } from "./Baselayout";
import { Button } from "../../atoms/Button/Button";
import { SendOutline } from "../../atoms/Icon/SendOutline";

export const DirectMessageList = () => {
  const { sender_id, recipient_name } = useParams();
  const socketUrl = `ws://127.0.0.1:8000/ws/${sender_id}/${recipient_name}`;
  const [isLoading, setIsLoading] = useState(false);
  const [newMessage, setNewMessage] = useState<DirectMessage[]>([]);
  const [chatHistory, setChatHistory] = useState<DirectMessage[]>([]);
  const [directMessage, setDirectMessage] = useState("");
  const processedMessages = useRef<Set<string>>(new Set());
  const [messageApi, contextHolder] = message.useMessage();

  const { sendJsonMessage } = useWebSocket(socketUrl, {
    onOpen: () => {
      console.log("Connected!");
    },
    onClose: () => {
      console.log("Closed!");
    },
    onError: () => {
      console.log("Error!");
    },
    onMessage: (msg) => {
      const data = JSON.parse(msg.data);
      // 同じメッセージが複数回処理されるのを防ぐ
      if (
        data.new_message &&
        !processedMessages.current.has(JSON.stringify(data.new_message))
      ) {
        processedMessages.current.add(JSON.stringify(data.new_message));
        setNewMessage((prev_msg) => [...prev_msg, data.new_message]);
      }
      setDirectMessage("");
    },
  });

  const fetchDMHistory = useCallback(async () => {
    if (!recipient_name) return;
    try {
      const res = await instance.get(
        `/api/chat-history/${sender_id}/${recipient_name}/`
      );
      setChatHistory(res.data);
    } catch (error) {
      messageApi.error("メッセージの取得に失敗しました");
    }
  }, []);

  useEffect(() => {
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
                    {Number(chat.sender.id) === Number(sender_id) &&
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
                            borderRadius: "18px",
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
                        onClick={() => {
                          sendJsonMessage({ type: "message", directMessage });
                        }}
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
