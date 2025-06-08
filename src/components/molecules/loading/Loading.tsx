import { Flex, Spin } from "antd";

export const Loading = () => {
  return (
    <Flex
      style={{
        width: "100%",
        height: "50vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" />
    </Flex>
  );
};
