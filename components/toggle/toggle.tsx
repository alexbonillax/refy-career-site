import { faCircle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react"

interface ToggleProps {
  value?: boolean;
  disabled?: boolean;
  onClick?: (e: boolean) => void;
}

export const Toggle = ({ value = false, disabled = false, onClick }: ToggleProps) => {
  const [data, setData] = useState<boolean>(value);
  return (
    <label className={`inline-flex relative items-center cursor-pointer ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}>
      {
        !disabled &&
        <input type="checkbox" checked={data} onChange={() => { setData(!data); onClick(!data); }} id="default-toggle" className={`sr-only peer`} />
      }
      <div className={`w-5.5 h-3 flex items-center ${data ? 'justify-end background-dynamic' : '!bg-gray-500'} transition-all peer-focus:outline-none peer-focus:ring-4 rounded-full peer`}>
        <div className="flex flex-align-justify-center w-3">
          <FontAwesomeIcon className={`icon-font icon-font--normal icon-font--white`} icon={faCircle} />
        </div>
      </div>
    </label>
  )
}