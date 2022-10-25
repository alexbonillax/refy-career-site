import { useTranslation } from "next-i18next";
import { useState } from "react";

export const ReadMore = ({ text }: { text: string }) => {
  const maxCharacters = 300;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  // const reducedText = isReadMore ? text.slice(0, maxCharacters) : text;
  const { t } = useTranslation("common");
  const label = isReadMore ? t('read-more') : t('read-less');
  return (
    <div className="relative font-multiline overflow-hidden">
      {
        text.length < maxCharacters ?
          (<p className="color-theme">{text}</p>)
          :
          (<>
            <p className={`color-theme ${isReadMore ? 'font--ellipsis-2' : ''}`}>
              {text}
            </p>
            {text.length > maxCharacters &&
            <div className="absolute bottom-0 right-0 background-theme">
              <span onClick={toggleReadMore} className="expansion-prose-trigger cursor-pointer ml-2">
                {isReadMore && '...'}{label}
              </span>
            </div>
            }
          </>
          )
      }
    </div>

  )
};