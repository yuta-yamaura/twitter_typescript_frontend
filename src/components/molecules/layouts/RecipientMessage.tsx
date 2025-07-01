import dayjs from "dayjs";
import type { DirectMessage } from "../../../types/DirectMessage";

type DirectMessageProps = {
  chat: DirectMessage;
};

export const RecipientMessage = ({ chat }: DirectMessageProps) => {
  return (
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
          {dayjs(chat.createdAt).format("YYYY年M月D日 H時m分")}
        </div>
      </div>
    </div>
  );
};
