import { useState } from "react";
import { TabsContext } from "./TabsContext";

export const TabsProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("tab-1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <TabsContext.Provider value={{ activeTab, handleTabClick }}>
      {children}
    </TabsContext.Provider>
  );
};
