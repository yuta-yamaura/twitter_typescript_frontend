import dayjs from "dayjs";
import type { DirectMessage } from "../../../types/DirectMessage";

type DirectMessageProps = {
  chat: DirectMessage;
};

export const SenderMessage = ({ chat }: DirectMessageProps) => {
  return (
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
          {dayjs(chat.createdAt).format("YYYY年M月D日 H時m分")}
        </div>
      </div>
    </div>
  );
};
