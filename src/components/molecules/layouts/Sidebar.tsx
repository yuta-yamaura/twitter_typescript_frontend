import Sider from "antd/es/layout/Sider";
import { Link } from "react-router-dom";
import { Button } from "../../atoms/Button/Button";
import { Space } from "antd";
import { XLogoView } from "../../atoms/Icon/XLogoView";
import { BellOutline } from "../../atoms/Icon/BellOutline";

export const Sidebar = () => {
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
            <BellOutline width="30px" height="30px" />
            <Space style={{ fontSize: "30px", marginLeft: "12px" }}>通知</Space>
          </Button>
        </Link>
      </Sider>
    </>
  );
};
