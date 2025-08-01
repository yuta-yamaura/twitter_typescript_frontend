import type { Icon } from "../../../types/Icon";

export const BookmarkFill = ({
  width = "24px",
  height = "24px",
  style,
}: Icon) => {
  return (
    <div style={{ width, height }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        className="icon"
        viewBox="0 0 1024 1024"
      >
        <path
          d="M938 458.8l-29.6-312.6c-1.5-16.2-14.4-29-30.6-30.6L565.2 86h-.4c-3.2 0-5.7 1-7.6 2.9L88.9 557.2a9.96 9.96 0 0 0 0 14.1l363.8 363.8c1.9 1.9 4.4 2.9 7.1 2.9s5.2-1 7.1-2.9l468.3-468.3c2-2.1 3-5 2.8-8zM699 387c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
          fill={style?.color}
        />
      </svg>
    </div>
  );
};
