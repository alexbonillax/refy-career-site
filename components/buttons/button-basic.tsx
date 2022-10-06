export const ButtonBasic = ({
  children,
  onClick,
  classes = null,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  classes?: string;
}) => (
  <button onClick={onClick} className={`button button-basic flex justify-center items-center ${classes}`}>{children}</button>
)