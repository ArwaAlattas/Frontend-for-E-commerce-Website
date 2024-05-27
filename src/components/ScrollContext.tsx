import React, { createContext, useRef, ReactNode, useCallback } from 'react';

interface ScrollContextProps {
  scrollToFooter: () => void;
}

export const ScrollContext = createContext<ScrollContextProps>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  scrollToFooter: () => {}, // Provide a default empty function
});

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const footerRef = useRef<HTMLDivElement>(null);

  const scrollToFooter = useCallback(() => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToFooter }}>
      {children}
      <div ref={footerRef} />
    </ScrollContext.Provider>
  );
};
