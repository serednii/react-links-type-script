// UsefulLinksController.ts

import { RefObject, useEffect } from "react";
import logicStore from "../mobx/LogicStore";
import { ActiveMenuType } from "../components/UsefulLinks/MenuLinks/type";
import AuthUser from "../AuthUser/components/AuthUser/AuthUser";
import authStore from "../mobx/AuthStore";
import InfoModal from "../components/InfoModal/InfoModal";
import adminController from "./admin-Controller";

export const useUsefulLinksController = (
  activesMenu: RefObject<ActiveMenuType[] | null>,
  menuRef: RefObject<HTMLDivElement> | null
) => {
  const handlerOpenPopup = (): void => {
    if(!adminController.accessUserActivated() || !adminController.accessUserAddedContent()){
      return
    }
      logicStore.setButtonPlus(!logicStore.isButtonPlus);
      logicStore.setChangeLinks(false);
  };

  const clearClickMenu = () => {
    activesMenu?.current?.forEach((e) => e.setIsOpenCloseSubMenu(""));
    activesMenu?.current?.splice(0);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (!menuRef?.current?.contains(event.target as Node)) {
      clearClickMenu();
    }
  };

  const handleEscapePress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      clearClickMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
    // eslint-disable-next-line
  }, []);

  return { handlerOpenPopup };
};
