import { Layout, theme } from "antd";
import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { decodeJWT, getAuthToken, removeToken } from "../../../utils/auth";

type BaselayoutProps = {
  children?: ReactNode;
};

export const Baselayout = ({ children }: BaselayoutProps) => {
  const { Header, Footer, Content } = Layout;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);
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

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decodeToken = decodeJWT(token);
      if (decodeToken && decodeToken.user_id) {
        setUserId(decodeToken.user_id);
      }
    }
  }, []); // 依存配列に空配列を指定し無限ループを防ぐ

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "42%",
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
        />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
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
