import Sider from "antd/es/layout/Sider";

export const Sidebar = () => {
  return (
    <>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div>Sidebar</div>
      </Sider>
    </>
  );
};
