// usefulLinksUtils.ts

import logicStore from "../../mobx/LogicStore";
import { ActiveMenuType } from "./MenuLinks/type";

// Toggles the state of the buttonPlus and sets changeLinks to false
export const handlerOpenPopup = (): void => {
  logicStore.setButtonPlus(!logicStore.isButtonPlus);
  logicStore.setChangeLinks(false);
};

// Clears the active menu state by setting each to closed
export const clearClickMenu = (activesMenu: ActiveMenuType[]) => {
  activesMenu.forEach((e) => e.setIsOpenCloseSubMenu(""));
  activesMenu.splice(0);
};

// Handles clicks outside the menu to close the submenu
export const handleClickOutside = (
  event: MouseEvent,
  menuRef: React.RefObject<HTMLDivElement>,
  activesMenu: ActiveMenuType[]
) => {
  if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
    clearClickMenu(activesMenu);
  }
};

// Handles the "Escape" key press to close the submenu
export const handleEscapePress = (
  event: KeyboardEvent,
  activesMenu: ActiveMenuType[]
) => {
  if (event.key === "Escape") {
    clearClickMenu(activesMenu);
  }
};
