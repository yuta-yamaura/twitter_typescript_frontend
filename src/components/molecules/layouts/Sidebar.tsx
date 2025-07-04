import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Flex, Space } from "antd";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { BellOutline } from "../../atoms/Icon/BellOutline";
import { BookmarkOutline } from "../../atoms/Icon/BookmarkOutline";
import { Mail } from "../../atoms/Icon/Mail";
import { UserDelete } from "../../atoms/Icon/UserDelete";
import { UserDeleteModal } from "../modals/UserDeleteModal";
import { UserOutline } from "../../atoms/Icon/UserOutline";
import { HomeOutline } from "../../atoms/Icon/HomeOutline";
import { Logout } from "../../atoms/Icon/Logout";

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
        <Flex style={{ paddingLeft: "15px" }}>
          <XLogoView width="30px" height="30px" />
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link to={"/"} style={{ textDecoration: "None", color: "inherit" }}>
            <Button type="text" style={{ borderRadius: "25px" }}>
              <HomeOutline width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                ホーム
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link
            to={"/notification"}
            style={{ textDecoration: "None", color: "inherit" }}
          >
            <Button type="text" style={{ borderRadius: "25px" }}>
              <BellOutline width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                通知
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link
            to={"/message"}
            style={{ textDecoration: "None", color: "inherit" }}
          >
            <Button type="text" style={{ borderRadius: "25px" }}>
              <Mail width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                メッセージ
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link
            to={"/bookmark"}
            style={{ textDecoration: "None", color: "inherit" }}
          >
            <Button type="text" style={{ borderRadius: "25px" }}>
              <BookmarkOutline width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                ブックマーク
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link
            to={`/user/${userId}`}
            style={{ textDecoration: "None", color: "inherit" }}
          >
            <Button type="text" style={{ borderRadius: "25px" }}>
              <UserOutline width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                プロフィール
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Link
            to={"/login"}
            style={{ textDecoration: "None", color: "inherit" }}
          >
            <Button type="text" style={{ borderRadius: "25px" }}>
              <Logout width="28px" height="28px" />
              <Space style={{ fontSize: "25px", marginLeft: "12px" }}>
                ログアウト
              </Space>
            </Button>
          </Link>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <Button
            type="text"
            style={{ borderRadius: "25px" }}
            onClick={handleOpenModal}
          >
            <UserDelete width="28px" height="28px" />
            <Space style={{ fontSize: "25px", marginLeft: "12px" }}>退会</Space>
          </Button>
        </Flex>
        <UserDeleteModal
          isModalOpen={isModalOpen}
          handleCancel={handleCancel}
          handleOk={handleOk}
        />
      </Sider>
    </>
  );
};
