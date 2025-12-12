import type { CSSProperties } from "react";

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: CSSProperties;
}
const ServerItem: React.FC<Props> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div
      className={`text-14 color-gray-2 rounded-12  w-fit ${className}`}
      style={{
        direction: "ltr",
        letterSpacing: "0.12em",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
export default ServerItem;