import { useState } from "react";

export const ReadMore = ({ text }: { text: string }) => {
  const maxCharacters = 300;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const reducedText = isReadMore ? text.slice(0, maxCharacters) : text;
  const label = isReadMore ? "...read more" : " show less";
  return (
    <div className="relative font-multiline overflow-hidden">
      {
        text.length < maxCharacters ?
          (<p className="font--dark">{text}</p>)
          :
          (
            <p className="font--dark">
              {reducedText}
              {text.length > maxCharacters &&
                <span onClick={toggleReadMore} className="expansion-prose-trigger font--grey background-color--white cursor-pointer">
                  {label}
                </span>
              }
            </p>
          )
      }
    </div>

  )
};