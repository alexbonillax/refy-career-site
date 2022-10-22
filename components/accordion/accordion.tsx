import { faChevronDown, faChevronUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Divider } from "../divider";

interface AccordionProps {
  children: React.ReactNode;
  title: string;
}

export const Accordion = ({ children, title }: AccordionProps) => {
  const [state, setState] = useState(true);
  const toggle = () => setState(!state);
  return (
    <div className="cursor-pointer py-3 mx-3" onClick={toggle}>
      <div className="flex items-center justify-between pb-2">
        <h1 className="font-big-title desktop:text-2xl mobile:text-lg">{title}</h1>
        <div className="w-2 h-2 mr-2 flex justify-center items-center">
          <FontAwesomeIcon
            icon={!state ? faChevronDown : faChevronUp}
            className={`icon-font`}
          ></FontAwesomeIcon>
        </div>
      </div>
      <Divider />
      <div className={`desktop:pt-6 mobile:pt-4 accordion accordion--${state ? 'open' : 'close'}`}>
        {children}
      </div>
    </div>
  )
}