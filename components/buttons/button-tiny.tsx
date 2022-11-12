import { IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonTiny = ({ icon, onClick }: { icon: IconDefinition, onClick: () => void }) => (
  <div onClick={onClick} className="flex justify-center items-center w-4 h-4 cursor-pointer br-var background-color--white box-shadow-container--card">
    <div className="flex items-center justify-center w-2 h-2">
      <FontAwesomeIcon icon={icon} className={`icon-font icon-font--normal icon-font--field-button`} />
    </div>
  </div>
)
