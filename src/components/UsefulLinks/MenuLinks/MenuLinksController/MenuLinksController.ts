// MenuLinksModel.ts

import dataStore from "../../../../mobx/DataStore";
import logicStore from "../../../../mobx/LogicStore";
import { IMenuLinks } from "../Interface";
import { ActiveMenuType } from "../type";

// MenuLinksController
// Set the active submenu and handle state cleanup
export const MenuLinksController = (
  key: string,
  level: number,
  activesMenu: ActiveMenuType[],
  setIsOpenCloseSubMenu: React.Dispatch<React.SetStateAction<string>>
) => {
  const findIndex = activesMenu.findIndex((e) => e.level === level);
  const menuLevel = activesMenu[findIndex]?.isOpenCloseSubMenu;
  const slice = activesMenu.slice(findIndex);

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

// Update the dataStore with the selected link data
export const updateDataStoreWithLink = (obj: IMenuLinks) => {
  dataStore.setListLinkData(obj);
};

// Open the settings modal with the specific data
export const openSettingsMenu = (data: IMenuLinks) => {
  logicStore.setModal(true);
  logicStore.setAddCategoryOther(true);
  dataStore.setSluice(data);
};
