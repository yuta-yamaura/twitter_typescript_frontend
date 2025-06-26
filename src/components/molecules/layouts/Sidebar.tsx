import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Space } from "antd";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { BellOutline } from "../../atoms/Icon/BellOutline";
import { BookmarkOutline } from "../../atoms/Icon/BookmarkOutline";
import { Mail } from "../../atoms/Icon/Mail";
import { UserDelete } from "../../atoms/Icon/UserDelete";
import { UserDeleteModal } from "../modals/UserDeleteModal";
import { UserOutline } from "../../atoms/Icon/UserOutline";
import { HomeOutline } from "../../atoms/Icon/HomeOutline";

type SidebarProps = {
  userId?: number;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
};

export const Sidebar = ({
  userId,
  isModalOpen,
  handleOpenModal,
  handleOk,
  handleCancel,
}: SidebarProps) => {
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#ffffff" }}
      >
        <XLogoView width="30px" height="30px" />
        <Link to={`/`} style={{ textDecoration: "None", color: "inherit" }}>
          <Button
            type="text"
            style={{ borderRadius: "25px", paddingTop: "24px" }}
          >
            <HomeOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
              ホーム
            </Space>
          </Button>
        </Link>
        <Link
          to={"/notification"}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button
            type="text"
            style={{ borderRadius: "25px", paddingTop: "24px" }}
          >
            <BellOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>通知</Space>
          </Button>
        </Link>
        <Link
          to={"/message"}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button
            type="text"
            style={{ borderRadius: "25px", paddingTop: "24px" }}
          >
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
          <Button
            type="text"
            style={{ borderRadius: "25px", paddingTop: "24px" }}
          >
            <BookmarkOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
              ブックマーク
            </Space>
          </Button>
        </Link>
        <Link
          to={`/user/${userId}`}
          style={{ textDecoration: "None", color: "inherit" }}
        >
          <Button
            type="text"
            style={{ borderRadius: "25px", paddingTop: "24px" }}
          >
            <UserOutline width="25px" height="25px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
              プロフィール
            </Space>
          </Button>
        </Link>
        <Button
          type="text"
          style={{ borderRadius: "25px", paddingTop: "24px" }}
          onClick={handleOpenModal}
        >
          <UserDelete width="25px" height="25px" />
          <Space style={{ fontSize: "25px", marginLeft: "12px" }}>退会</Space>
        </Button>
        <UserDeleteModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </Sider>
    </>
  );
};
