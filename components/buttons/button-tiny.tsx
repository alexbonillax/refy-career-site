import { IconDefinition } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonTiny = ({ icon, selected, onClick }: { icon: IconDefinition, selected?: boolean, onClick: () => void }) => (
  <div onClick={onClick} className={`flex justify-center items-center w-4 h-4 cursor-pointer br-var box-shadow-container--card ${selected ? 'background-dynamic' : 'background-color--white'} `}>
    <div className="flex items-center justify-center w-2 h-2">
      <FontAwesomeIcon icon={icon} className={`icon-font icon-font--normal icon-font--field-button ${selected ? 'icon-font--white' : 'icon-font--field-button'}`} />
    </div>
  </div>
)
