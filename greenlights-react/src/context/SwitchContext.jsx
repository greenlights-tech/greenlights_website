import { createContext, useState } from "react";

const SwitchContext = createContext();

export const SwitchProvider = ({ children }) => {
  const [switched, setSwitched] = useState(false);
  return (
    <SwitchContext.Provider value={{ switched, setSwitched }}>
      {children}
    </SwitchContext.Provider>
  );
};

// export const useSwitch = () => useContext(SwitchContext);
