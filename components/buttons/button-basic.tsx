export const ButtonBasic = ({
  children,
  bgColor = "FE6680",
  classes,
}: {
  children: React.ReactNode;
  bgColor?: string;
  classes?: string;
}) => (
  <button className={`button button-basic ${classes}`} style={{backgroundColor: bgColor}}>{children}</button>
)