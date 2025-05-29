import { Layout, theme } from "antd";
import { Addtweet } from "../../molecules/layouts/Addtweet";
import { Sidebar } from "../../molecules/layouts/Sidebar";
import { TweetsList } from "../../molecules/layouts/TweetsList";

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
        minHeight: "100vh",
      }}
    >
      <Layout style={{ minHeight: "100%" }}>
        <Sidebar />
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content
            style={{
              margin: "24px 16px 0",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: 24,
              overflow: "auto",
            }}
          >
            <Addtweet />
            <TweetsList />
          </Content>
          <Footer style={{ textAlign: "center", padding: "12px 0" }}>
            X Clone ©{new Date().getFullYear()} Created by Yuta
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
