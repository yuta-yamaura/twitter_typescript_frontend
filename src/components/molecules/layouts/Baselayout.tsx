import { Flex, Layout, theme } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { decodeJWT, getAuthToken, removeToken } from "../../../utils/auth";
import { useLocation } from "react-router-dom";
import { authInstance } from "../../../utils/client";

type BaselayoutProps = {
  children?: ReactNode;
};

export const Baselayout = ({ children }: BaselayoutProps) => {
  const { pathname } = useLocation();
  const { Header, Footer, Content } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [user, setUser] = useState();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    removeToken();
    window.location.href = "/login";
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loginUser = async () => {
    const res = await authInstance.get(`api/users/info/`);
    setUser(res.data);
  };

  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;
    const decodeToken = decodeJWT(token);
    if (decodeToken && decodeToken.user_id) {
      setUserId(decodeToken.user_id);
    }
    loginUser();
  }, []); // 依存配列に空配列を指定し無限ループを防ぐ

  const renderHeaderContnet = () => {
    switch (pathname) {
      case "/notification":
        return <Flex>通知</Flex>;
      case "/message":
        return <Flex>メッセージ</Flex>;
      case "/bookmark":
        return <Flex>ブックマーク</Flex>;
      case `/user/${userId}`:
        return <Flex>プロフィール</Flex>;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        paddingLeft: "20%",
        minHeight: "100vh",
      }}
    >
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar
          userId={userId}
          handleOpenModal={handleOpenModal}
          isModalOpen={isModalOpen}
          handleOk={handleOk}
          handleCancel={handleCancel}
          user={user}
        />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "24px",
              paddingLeft: "24px",
              fontWeight: "bold",
            }}
          >
            {renderHeaderContnet()}
          </Header>
          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              paddingLeft: 24,
              paddingRight: 24,
              overflow: "auto",
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center", padding: "12px 0" }}>
            X Clone ©{new Date().getFullYear()} Created by Yuta
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
