import "./CustomButton.css";

import type { ReactNode } from "react";

function CustomButton({
  isActive,
  children,
}: {
  isActive?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`custom-button ${isActive ? "button-active" : ""}`}>
      {children}
    </div>
  );
}

export default CustomButton;
