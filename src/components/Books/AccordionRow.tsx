import { useRef, useEffect, useState } from "react";

interface AccordionRowProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function AccordionRow({ isOpen, children }: AccordionRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
        <div
          ref={contentRef}
          style={{
            maxHeight: height,
            transition: "max-height 0.3s ease",
            overflow: "hidden",
          }}
          className={`bg-gray-800 text-white text-center`} 
        >
          <div className="p-4">{children}</div>
        </div>
  );
}
