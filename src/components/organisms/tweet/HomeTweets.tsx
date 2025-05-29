import { Layout, theme } from "antd";
import { Addtweet } from "../../molecules/layouts/Addtweet";
import { Sidebar } from "../../molecules/layouts/Sidebar";

export const HomeTweets = () => {
  const { Header, Footer, Content } = Layout;

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "50%",
        paddingLeft: "22%",
        height: "100vh",
      }}
    >
      <Layout style={{ height: "100%" }}>
        <Sidebar />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content
            style={{ margin: "24px 16px 0", height: "calc(100vh - 64px)" }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                height: "100%",
              }}
            >
              <Addtweet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            X Clone ©{new Date().getFullYear()} Created by Yuta
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
