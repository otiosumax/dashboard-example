export default function LogLine({
  info,
}: {
  info: {
    id: number;
    user: string;
    action: string;
    target: string;
    time: string;
    type: string;
  };
}) {
  const COLORS_DICT: { [type: string]: string } = {
    create: "rgb(0, 212, 168)",
    warning: "#f0a500",
    edit: "rgb(45, 111, 255)",
    delete: "rgb(232, 93, 58)",
    sync: "rgb(155, 89, 216)",
    invite: "rgb(0, 212, 168)",
  };

  return (
    <div className="log-line border-t">
      <p>
        {info.user} <span className="text-muted">{info.action}</span>{" "}
        <span style={{ color: COLORS_DICT[info.type] }}>{info.target}</span>
      </p>
      <span className="text-muted">{info.time}</span>
    </div>
  );
}