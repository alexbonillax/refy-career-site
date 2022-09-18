export const ButtonBasic = ({
  children,
  onClick,
  bgColor = "FE6680",
  classes = null,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  bgColor?: string;
  classes?: string;
}) => (
  <button onClick={onClick} className={`button button-basic ${classes}`} style={{ backgroundColor: bgColor }}>{children}</button>
)