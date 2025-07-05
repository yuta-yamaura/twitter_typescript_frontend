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
import type { User } from "../../../types/User";

type SidebarProps = {
  userId?: number;
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  user?: User;
};

export const Sidebar = ({
  userId,
  isModalOpen,
  handleOpenModal,
  handleOk,
  handleCancel,
  user,
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
          <Link to="/" style={{ textDecoration: "None", color: "inherit" }}>
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
        <Flex
          style={{
            paddingTop: "12px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="text"
            style={{
              borderRadius: "25px",
              backgroundColor: "black",
            }}
          >
            <Space
              style={{
                fontSize: "18px",
                marginLeft: "12px",
                color: "white",
                fontWeight: "bold",
              }}
            >
              ポストする
            </Space>
          </Button>
        </Flex>
        <Flex style={{ paddingTop: "12px" }}>
          <img
            src={user?.image}
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              marginRight: "8px",
            }}
          />
          <Flex style={{ flexDirection: "column" }}>
            <Flex style={{ fontSize: "18px", fontWeight: "bold" }}>
              {user?.accountName}
            </Flex>
            <Flex style={{ fontSize: "16px", color: "gray" }}>
              @{user?.username}
            </Flex>
          </Flex>
        </Flex>
      </Sider>
    </>
  );
};
