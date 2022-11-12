import { faMagnifyingGlass } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import debounce from 'lodash.debounce';


export const SearchBar = ({ onChange }: { onChange?: (e: string) => void }) => {
  const changeHandler = (event: any) => {
    onChange(event.target.value);
  };
  const debouncedChangeHandler = useCallback(
    debounce(changeHandler, 400)
  , []);
  return (
    <div className="relative w-full pl-6 pr-1 flex items-center box-shadow-container--card background-color--white br-var">
      <div className="flex absolute left-3 items-center justify-center w-2 h-2">
        <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon-font icon-font--normal icon-font--field-button`} />
      </div>
      <input onChange={debouncedChangeHandler} className="w-full font-multiline font--grey-1000 h-6 appearance-none" />
    </div>
  )
}
