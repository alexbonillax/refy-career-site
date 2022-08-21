interface DividerProps {
  title?: string;
}

export const Divider = ({ title }: DividerProps) => (
  <div className="divider-wrapper">
  <div className="divider-line"></div>
  <div className="divider-title-wrapper flex flex-align-justify-center">
    { title && <p className="divider-title font-hint px-1 br-1">{ title }</p> }
  </div>
</div>

)