import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Space } from "antd";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { BellOutline } from "../../atoms/Icon/BellOutline";
import { BookmarkOutline } from "../../atoms/Icon/BookmarkOutline";
import { Mail } from "../../atoms/Icon/Mail";

type SidebarProps = {
  userId?: number;
};

export const Sidebar = ({ userId }: SidebarProps) => {
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#ffffff" }}
      >
        <XLogoView width="30px" height="30px" />
        <Link
          to={"/notification"}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button type="text" style={{ borderRadius: "25px" }}>
            <BellOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>通知</Space>
          </Button>
        </Link>
        <Link
          to={"/message"}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button type="text" style={{ borderRadius: "25px" }}>
            <Mail width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
              メッセージ
            </Space>
          </Button>
        </Link>
        <Link
          to={`/${userId}/bookmark`}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button type="text" style={{ borderRadius: "25px" }}>
            <BookmarkOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
              ブックマーク
            </Space>
          </Button>
        </Link>
      </Sider>
    </>
  );
};
