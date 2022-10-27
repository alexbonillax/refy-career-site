import { faChevronDown, faChevronUp } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useEffect, useRef, useState} from "react";
import { Divider } from "../divider";
import {IconName} from "@fortawesome/pro-light-svg-icons";

interface AccordionProps {
  first: boolean;
  children: React.ReactNode;
  title: string;
  iconName: IconName;
}

export const Accordion = ({ first, children, title, iconName }: AccordionProps) => {
  const targetRef = useRef(null);
  const [state, setState] = useState(true);
  const [maxHeight, setMaxHeight] = useState('unset');
  const toggle = () => setState(!state);
  useEffect(() => {
    setMaxHeight(targetRef.current.clientHeight);
  }, []);
  return (
    <div className="">
      {
        !first &&
        <Divider></Divider>
      }
      <div className="mx-2">
        <div className="flex items-center justify-between py-2 cursor-pointer" onClick={toggle}>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-3xl background-faded-dynamic flex items-center justify-center mr-3">
              <div className="w-3 h-3">
                <FontAwesomeIcon icon={['far', iconName]} className='icon-font color-dynamic'/>
              </div>
            </div>
            <h1 className="font-title">{title}</h1>
          </div>
          <div className="w-2 h-2 mx-2 flex justify-center items-center">
            <FontAwesomeIcon
              icon={!state ? faChevronDown : faChevronUp}
              className={`icon-font icon-font--grey`}
            ></FontAwesomeIcon>
          </div>
        </div>
        <div ref={targetRef} className={`accordion accordion--${state ? 'open' : 'close'}`} style={{ maxHeight: maxHeight }}>
          <Divider></Divider>
          {children}
        </div>
      </div>
    </div>
  )
}