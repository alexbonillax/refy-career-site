import { faMagnifyingGlass } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const SearchBarAction = ({ placeholder, onClick }: { placeholder: string, onClick?: (e: string) => void }) => {
  const [value, setValue] = useState<string>('');
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      onClick(value);
    }
  }
  return (
    <div className="relative w-full pl-4 flex items-center box-shadow-container--card background-color--white br-var">
      <input onKeyDown={handleKeyDown} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} className="w-full font-multiline font--grey-1000 background-color--white  h-6 appearance-none" />
      <div className="h-6 w-8 flex justify-center items-center background-dynamic br-r-var cursor-pointer" onClick={() => onClick(value)}>
        <div className="flex items-center justify-center w-2 h-2 cursor-pointer">
          <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon-font icon-font--normal icon-font--white`} />
        </div>
      </div>
    </div>
  )
}
