/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

// 1. Maak de "box" (context) aan waar we de data in stoppen
const IntroContext = createContext();

// 2. De Provider die de status beheert en deelt
export const IntroProvider = ({ children }) => {
  // We zetten de status standaard op 'false' (intro is nog bezig)
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <IntroContext.Provider value={{ introFinished, setIntroFinished }}>
      {children}
    </IntroContext.Provider>
  );
};

// 3. Een simpele hook zodat je makkelijk 'useIntro()' kunt roepen
export const useIntro = () => useContext(IntroContext);
