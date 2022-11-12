import { faChevronDown } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface SelectListProps {
  id: number | string;
  value: string
}

export interface SelectProps {
  list: SelectListProps[];
  emptyValue?: string;
  onChange?: (e: string) => void;
}

export const Select = ({ emptyValue, list, onChange }: SelectProps) => {
  return (
    <>
      {
        list?.length > 0 &&
        <>
          <div className="relative w-full flex items-center">
            <select onChange={e => onChange(e.target.value)} className="w-full font-multiline font--grey-1000 h-6 pl-3 box-shadow-container--card background-color--white br-var appearance-none">
              <option selected value={0}>{emptyValue}</option>
              {
                list.map((item, i) => (
                  <option key={i} value={item.id}>{item.value}</option>
                ))
              }
            </select>
            <div className="flex absolute right-3 items-center justify-center w-2 h-2">
              <FontAwesomeIcon icon={faChevronDown} className={`icon-font icon-font--normal icon-font--field-button`} />
            </div>
          </div>
        </>
      }
    </>
  )

}