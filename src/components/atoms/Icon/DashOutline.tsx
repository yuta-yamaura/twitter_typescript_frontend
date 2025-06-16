import type { Icon } from "../../../types/Icon";

export const DashOutline = ({ width = "24px", height = "24px" }: Icon) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 1024 1024"
      >
        <path
          fill="currentColor"
          d="M176 511a56 56 0 1 0 112 0a56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0a56 56 0 1 0-112 0zm280 0a56 56 0 1 0 112 0a56 56 0 1 0-112 0z"
        />
      </svg>
    </div>
  );
};
