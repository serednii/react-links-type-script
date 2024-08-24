// menuLinksUtils.ts


import logicStore from "../../../mobx/LogicStore";
import dataStore from "../../../mobx/DataStore";
import { IMenuLinks } from "./Interface";
import { ActiveMenuType } from "./type";

// Handle the printing of links, updating the active menu state
export const handlePrintLinks = (
  obj: IMenuLinks,
  activesMenu: ActiveMenuType[],
  level: number
): void => {

  const findIndex = activesMenu.findIndex((e) => e.level === level);
  const slice = activesMenu.slice(findIndex);

  if (findIndex >= 0) {
    activesMenu.splice(findIndex);
    slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
  }

  dataStore.setListLinkData(obj);
};

// Open settings menu for a given data item
export const handleOpenSettingMenu = (data: IMenuLinks): void => {
  logicStore.setModal(true);
  logicStore.setAddCategoryOther(true);
  dataStore.setSluice(data); // pass the link to the object that will be changed
};

// Set the submenu state for opening and closing
export const handleSetIsOpenCloseSubMenu = (
  key: string,
  activesMenu: ActiveMenuType[],
  level: number,
  setIsOpenCloseSubMenu: React.Dispatch<React.SetStateAction<string>>
) => {
  const findIndex = activesMenu.findIndex((e) => e.level === level);
  const slice = activesMenu.slice(findIndex);
  const menuLevel = activesMenu[findIndex]?.isOpenCloseSubMenu;

  if (findIndex >= 0) {
    activesMenu.splice(findIndex);
    slice.forEach((e) => e.setIsOpenCloseSubMenu(""));
  }

  if (findIndex !== level) {
    setIsOpenCloseSubMenu((prev) => (prev ? (prev === key ? "" : key) : key));
  }

  if (findIndex === level && menuLevel !== key) {
    setIsOpenCloseSubMenu(key);
  }

};
