export const ButtonBasic = ({ children, onClick, classes = null }: { children: React.ReactNode; onClick?: () => void; classes?: string; }) => (
  <button onClick={onClick} className={`button flex justify-center items-center ${classes}`}>{children}</button>
)