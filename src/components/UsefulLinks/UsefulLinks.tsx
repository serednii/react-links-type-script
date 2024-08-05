import ListLinks from "./ListLinks/ListLinks";
import MenuLinks from "./MenuLinks/MenuLinks";
import { MyContext } from "../../MyContext";
import { useContext, useEffect, useRef, useCallback } from "react";
import Article from "../Article/Article";
import { observer } from "mobx-react-lite";
import todoStore from "../../mobx/store";

import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer"; // Убедитесь, что путь правильный

import "./UsefulLinks.scss";
type MenuFunctionType = (value: string) => void;

type ActiveMenuType = {
  setIsOpenCloseSubMenu: MenuFunctionType;
  isOpenCloseSubMenu: string;
  level: number;
};

function UsefulLinks() {
  const activesMenu = useRef<ActiveMenuType[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const { idArticle } = useSelector((state: RootState) => state.data);

  const clearClickMenu = useCallback(() => {
    activesMenu.current.forEach((e) => e.setIsOpenCloseSubMenu(""));
    activesMenu.current.splice(0);
  }, []);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        clearClickMenu();
      }
    },
    [clearClickMenu]
  );

  const handleEscapePress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearClickMenu();
      }
    },
    [clearClickMenu]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapePress);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapePress);
    };
  }, [handleClickOutside, handleEscapePress]);

  return (
    <section className="useFull_links flex-grow-1 d-flex flex-column rounded-4">
      <main className="main">
        <div ref={menuRef} className="menu-wrapper">
          <MenuLinks
            key={"MenuLinks"}
            dataMenu={todoStore.dataMain}
            firstMenu={true}
            level={0}
            activesMenu={activesMenu.current}
          />
        </div>

        <ListLinks />
        {idArticle && <Article />}
      </main>
    </section>
  );
}

export default observer(UsefulLinks);
