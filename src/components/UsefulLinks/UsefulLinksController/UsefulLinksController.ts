// UsefulLinksController.ts

import { RefObject, useEffect } from "react";
import logicStore from "../../../mobx/LogicStore";
import { ActiveMenuType } from "../MenuLinks/type";
import AuthUser from "../../../AuthUser/components/AuthUser/AuthUser";
import authStore from "../../../mobx/AuthStore";
import InfoModal from "../../InfoModal/InfoModal";
import adminController from "../../AdminPanel/AdminControler/admin-Controller";

export const useUsefulLinksController = (
  activesMenu: RefObject<ActiveMenuType[] | null>,
  menuRef: RefObject<HTMLDivElement> | null
) => {
  const handlerOpenPopup = (): void => {
    if(!adminController.accessUserActivated() ){
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
