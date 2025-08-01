import type { Icon } from "../../../types/Icon";

export const XLogoView = ({ width = "24px", height = "24px" }: Icon) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        fill="currentColor"
        fillRule="evenodd"
      >
        <path
          d="M818 800 498.11 333.745l.546.437L787.084 0h-96.385L455.738 272 269.15 0H16.367l298.648 435.31-.036-.037L0 800h96.385l261.222-302.618L565.217 800zM230.96 72.727l448.827 654.546h-76.38L154.217 72.727z"
          transform="translate(103 112)"
        />
      </svg>
    </div>
  );
};
