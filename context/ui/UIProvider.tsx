import {useReducer} from "react";

import {UIContext} from "./UIContext";
import {uiReducer} from "./uiReducer";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
};

interface Props {
  children: React.ReactNode;
}

export const UIProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({type: "UI - Close Sidebar"});
  };

  const closeSideMenu = () => {
    dispatch({type: "UI - Close Sidebar"});
  };

  const setIsAddingEntry = (value: boolean) => {
    dispatch({type: "UI - Is Adding Entry", payload: value});
  };

  const setDragging = (value: boolean) => {
    dispatch({type: "UI - Is Dragging Entry", payload: value});
  };

  return (
    <UIContext.Provider
      value={{...state, openSideMenu, closeSideMenu, setIsAddingEntry, setDragging}}
    >
      {children}
    </UIContext.Provider>
  );
};
