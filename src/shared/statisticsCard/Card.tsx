import "./Card.css";

import type { ReactNode } from "react";

function Card({
  title,
  value,
  children,
}: {
  title?: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="statistics-card">
      <p className="font-mono text-muted">{(title ?? "").toUpperCase()}</p>
      <h1>{value}</h1>

      {children}
    </div>
  );
}

export default Card;
