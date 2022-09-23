import React from "react";

interface FloatingContainerProps {
  children: React.ReactNode;
}

export const FloatingContainer = ({ children }: FloatingContainerProps) => {
  const [clientWindowHeight, setClientWindowHeight] = React.useState("");
  const [scrolled, setScrolling] = React.useState(false);
  const displayPosition = 230;

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setClientWindowHeight((window.scrollY).toString());
  };

  React.useEffect(() => {
    setScrolling(+clientWindowHeight > displayPosition);
  }, [clientWindowHeight]);

  return (
    <div className={`floating-container--bottom w-full fixed justify-center right-0 left-0 ${scrolled ? 'visible flex' : 'hidden'}`}>
      {children}
    </div>
  )

}