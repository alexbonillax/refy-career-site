import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

const IconItem = ({icon, title, text}: { icon: IconProp; title: string; text?: string; }) => (
  <div className="flex py-4">
    <div className="flex border-2	border-primary rounded-xl w-12 min-w-12 h-12 justify-center items-center">
      <FontAwesomeIcon icon={icon} className="font-icon color-primary"></FontAwesomeIcon></div>
    <div className="flex flex-col px-4">
      <h3 className="font-item-title">{title}</h3>
      { text && <p className="font-item-text mt-1" dangerouslySetInnerHTML={{__html: text}}></p>}
    </div>
  </div>
);

export default IconItem;
