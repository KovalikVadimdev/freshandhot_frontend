import { useContext } from "react";
import { TabsContext } from "./TabsContext";

export const useTabs = () => useContext(TabsContext);
